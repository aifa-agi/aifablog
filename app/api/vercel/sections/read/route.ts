// @/app/api/sections/read/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface ReadSectionsRequest {
  filePath: string; // e.g., "canary-islands/paromy-na-tenerife"
}

interface ReadSectionsResponse {
  success: boolean;
  message: string;
  sections?: any[];
  environment: 'development' | 'production';
  error?: string;
  errorCode?: string;
  details?: string;
}

enum ErrorCode {
  GITHUB_TOKEN_INVALID = 'github_token_invalid',
  GITHUB_API_UNAVAILABLE = 'github_api_unavailable',
  NETWORK_ERROR = 'network_error',
  FILE_READ_FAILED = 'file_read_failed',
  INVALID_DATA_FORMAT = 'invalid_data_format',
  VALIDATION_ERROR = 'validation_error',
  FILE_NOT_FOUND = 'file_not_found',
  PARSE_ERROR = 'parse_error',
  UNKNOWN_ERROR = 'unknown_error'
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function validateFilePath(filePath: string): void {
  const pathRegex = /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
  if (!pathRegex.test(filePath)) {
    throw new Error('Invalid file path format. Expected format: "category/subcategory"');
  }
}

function parseTypescriptSections(fileContent: string): any[] {
  try {
    // Try to match export const sections pattern
    const sectionsMatch = fileContent.match(/export const sections[^=]*=\s*(\[[\s\S]*?\]);/);
    
    if (!sectionsMatch) {
      throw new Error('Could not find sections export pattern in file');
    }

    const sectionsCode = sectionsMatch[1];
    
    // Clean the code before evaluation
    const cleanedCode = sectionsCode
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, ''); // Remove line comments
    
    // Use eval to parse the array (controlled environment)
    // eslint-disable-next-line no-eval
    const sections = eval(`(${cleanedCode})`);
    
    if (!Array.isArray(sections)) {
      throw new Error('Sections must be an array');
    }
    
    return sections;
  } catch (error) {
    throw new Error(`Failed to parse sections: ${error instanceof Error ? error.message : 'Unknown parsing error'}`);
  }
}

async function readFromGitHub(filePath: string): Promise<ReadSectionsResponse> {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO;
    const GITHUB_SECTIONS_BASE_PATH = process.env.GITHUB_SECTIONS_BASE_PATH || 'config/content/sections';

    if (!GITHUB_TOKEN) {
      return {
        success: false,
        message: "GitHub token is not configured",
        error: "GitHub token is missing in environment variables",
        errorCode: ErrorCode.GITHUB_TOKEN_INVALID,
        environment: 'production'
      };
    }

    if (!GITHUB_REPO) {
      return {
        success: false,
        message: "GitHub repository is not configured",
        error: "GitHub repository is missing in environment variables",
        errorCode: ErrorCode.GITHUB_API_UNAVAILABLE,
        environment: 'production'
      };
    }

    const githubFilePath = `${GITHUB_SECTIONS_BASE_PATH}/${filePath}.ts`;

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${githubFilePath}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (response.status === 404) {
      return {
        success: true,
        message: "No sections file found in GitHub",
        sections: [],
        environment: 'production'
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: "Failed to read file from GitHub",
        error: `GitHub API returned ${response.status}: ${errorData.message || 'Unknown error'}`,
        errorCode: response.status === 401 ? ErrorCode.GITHUB_TOKEN_INVALID : ErrorCode.GITHUB_API_UNAVAILABLE,
        environment: 'production',
        details: JSON.stringify(errorData)
      };
    }

    const fileData = await response.json();
    
    if (!fileData.content) {
      return {
        success: false,
        message: "File content not found in GitHub response",
        error: "GitHub API returned empty content",
        errorCode: ErrorCode.FILE_READ_FAILED,
        environment: 'production'
      };
    }

    // Decode base64 content
    const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    try {
      const sections = parseTypescriptSections(fileContent);
      
      return {
        success: true,
        message: "Sections loaded successfully from GitHub",
        sections,
        environment: 'production'
      };
    } catch (parseError) {
      return {
        success: false,
        message: "Failed to parse sections from GitHub file",
        error: parseError instanceof Error ? parseError.message : 'Unknown parsing error',
        errorCode: ErrorCode.PARSE_ERROR,
        environment: 'production'
      };
    }

  } catch (error: any) {
    return {
      success: false,
      message: "Network error while connecting to GitHub",
      error: error.message || "Unknown network error",
      errorCode: ErrorCode.NETWORK_ERROR,
      environment: 'production'
    };
  }
}

async function readFromFileSystem(filePath: string): Promise<ReadSectionsResponse> {
  try {
    const fullPath = path.join(process.cwd(), 'config', 'content', 'sections', `${filePath}.ts`);

    try {
      // Check if file exists and read content
      await fs.access(fullPath);
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      
      try {
        const sections = parseTypescriptSections(fileContent);
        
        return {
          success: true,
          message: "Sections loaded successfully from filesystem",
          sections,
          environment: 'development'
        };
      } catch (parseError) {
        return {
          success: false,
          message: "Failed to parse sections from local file",
          error: parseError instanceof Error ? parseError.message : 'Unknown parsing error',
          errorCode: ErrorCode.PARSE_ERROR,
          environment: 'development'
        };
      }

    } catch (fileError: any) {
      if (fileError.code === 'ENOENT') {
        // File doesn't exist - return empty sections
        return {
          success: true,
          message: "No sections file found in filesystem",
          sections: [],
          environment: 'development'
        };
      }
      
      if (fileError.code === 'EACCES') {
        return {
          success: false,
          message: "Permission denied: Unable to read from file system",
          error: fileError.message,
          errorCode: ErrorCode.FILE_READ_FAILED,
          environment: 'development'
        };
      }
      
      throw fileError;
    }

  } catch (error: any) {
    return {
      success: false,
      message: "Failed to read file from local filesystem",
      error: error.message || "Unknown filesystem error",
      errorCode: ErrorCode.FILE_READ_FAILED,
      environment: 'development'
    };
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ReadSectionsResponse>> {
  try {
    let body: ReadSectionsRequest;
    
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body',
          error: error instanceof Error ? error.message : 'Unknown parsing error',
          errorCode: ErrorCode.INVALID_DATA_FORMAT,
          environment: isProduction() ? 'production' : 'development'
        },
        { status: 400 }
      );
    }

    const { filePath } = body;

    if (!filePath || typeof filePath !== 'string' || filePath.trim() === '') {
      return NextResponse.json({
        success: false,
        message: "File path is required and must be a non-empty string",
        errorCode: ErrorCode.VALIDATION_ERROR,
        environment: isProduction() ? 'production' : 'development'
      }, { status: 400 });
    }

    try {
      validateFilePath(filePath.trim());
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: error instanceof Error ? error.message : 'File path validation failed',
        errorCode: ErrorCode.VALIDATION_ERROR,
        environment: isProduction() ? 'production' : 'development'
      }, { status: 400 });
    }

    // Route to appropriate read function based on environment
    const result: ReadSectionsResponse = isProduction()
      ? await readFromGitHub(filePath.trim())
      : await readFromFileSystem(filePath.trim());

    const httpStatus = result.success ? 200 : (result.errorCode === ErrorCode.FILE_NOT_FOUND ? 404 : 500);
    
    return NextResponse.json(result, { 
      status: httpStatus,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error: any) {
    const errorResponse: ReadSectionsResponse = {
      success: false,
      message: "An unexpected error occurred while reading sections",
      error: error.message || "Unknown error",
      errorCode: ErrorCode.UNKNOWN_ERROR,
      environment: isProduction() ? 'production' : 'development'
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Optional: Add GET method for query parameter based requests
export async function GET(request: NextRequest): Promise<NextResponse<ReadSectionsResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('filePath');
    
    if (!filePath) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'filePath query parameter is required',
          errorCode: ErrorCode.VALIDATION_ERROR,
          environment: isProduction() ? 'production' : 'development'
        },
        { status: 400 }
      );
    }

    try {
      validateFilePath(filePath);
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: error instanceof Error ? error.message : 'File path validation failed',
        errorCode: ErrorCode.VALIDATION_ERROR,
        environment: isProduction() ? 'production' : 'development'
      }, { status: 400 });
    }

    // Route to appropriate read function based on environment
    const result: ReadSectionsResponse = isProduction()
      ? await readFromGitHub(filePath)
      : await readFromFileSystem(filePath);

    const httpStatus = result.success ? 200 : (result.errorCode === ErrorCode.FILE_NOT_FOUND ? 404 : 500);
    
    return NextResponse.json(result, { 
      status: httpStatus,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error: any) {
    const errorResponse: ReadSectionsResponse = {
      success: false,
      message: "An unexpected error occurred while reading sections",
      error: error.message || "Unknown error",
      errorCode: ErrorCode.UNKNOWN_ERROR,
      environment: isProduction() ? 'production' : 'development'
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
