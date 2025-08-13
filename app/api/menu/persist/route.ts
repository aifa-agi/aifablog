// @/app/api/menu/persist/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { 
  OperationStatus, 
  ErrorCode, 
  MenuPersistResponse 
} from "@/app/(_service)/types/api-response-types";

const DATA_PATH = path.resolve(process.cwd(), "app/config/content/content-data.ts");

function isProduction() {
  return process.env.NODE_ENV === "production";
}

/**
 * Attempt to save data to GitHub repository
 */
async function saveToGitHub(categories: any[]): Promise<MenuPersistResponse> {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO; // format: "owner/repo"
    const FILE_PATH = process.env.GITHUB_FILE_PATH ;

    if (!GITHUB_TOKEN) {
      return {
        status: OperationStatus.GITHUB_API_ERROR,
        message: "GitHub token is not configured",
        error: "GitHub token is missing in environment variables",
        errorCode: ErrorCode.GITHUB_TOKEN_INVALID,
        environment: 'production'
      };
    }

    if (!GITHUB_REPO) {
      return {
        status: OperationStatus.GITHUB_API_ERROR,
        message: "GitHub repository is not configured",
        error: "GitHub repository is missing in environment variables",
        errorCode: ErrorCode.GITHUB_API_UNAVAILABLE,
        environment: 'production'
      };
    }

    const fileContents = `import { MenuCategory } from "@/app/(_service)/types/menu-types";

export const contentData = {
  categories: ${JSON.stringify(categories, null, 2)}
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;
`;

    const encodedContent = Buffer.from(fileContents).toString('base64');

    // Get current file SHA (required for updates)
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    let sha: string | undefined;
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      sha = fileData.sha;
    }

    // Update file on GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Update menu categories - ${new Date().toISOString()}`,
          content: encodedContent,
          ...(sha && { sha })
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json().catch(() => ({}));
      return {
        status: OperationStatus.GITHUB_API_ERROR,
        message: "Failed to update file on GitHub",
        error: `GitHub API returned ${updateResponse.status}: ${errorData.message || 'Unknown error'}`,
        errorCode: updateResponse.status === 401 ? ErrorCode.GITHUB_TOKEN_INVALID : ErrorCode.GITHUB_API_UNAVAILABLE,
        environment: 'production',
        details: JSON.stringify(errorData)
      };
    }

    return {
      status: OperationStatus.SUCCESS,
      message: "Successfully updated data on GitHub",
      environment: 'production'
    };

  } catch (error: any) {
    return {
      status: OperationStatus.GITHUB_API_ERROR,
      message: "Network error while connecting to GitHub",
      error: error.message || "Unknown network error",
      errorCode: ErrorCode.NETWORK_ERROR,
      environment: 'production'
    };
  }
}

/**
 * Save data to local filesystem (development mode)
 */
function saveToFileSystem(categories: any[]): MenuPersistResponse {
  try {
    const fileContents = `import { MenuCategory } from "@/app/(_service)/types/menu-types";

export const contentData = {
  categories: ${JSON.stringify(categories, null, 2)}
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;
`;

    fs.writeFileSync(DATA_PATH, fileContents, { encoding: "utf8" });

    return {
      status: OperationStatus.SUCCESS,
      message: "Successfully saved to filesystem",
      environment: 'development'
    };

  } catch (error: any) {
    return {
      status: OperationStatus.FILESYSTEM_ERROR,
      message: "Failed to save file to local filesystem",
      error: error.message || "Unknown filesystem error",
      errorCode: ErrorCode.FILE_WRITE_FAILED,
      environment: 'development'
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { categories } = body;

    // Validate input data
    if (!Array.isArray(categories)) {
      const validationResponse: MenuPersistResponse = {
        status: OperationStatus.VALIDATION_ERROR,
        message: "Invalid data format",
        error: "Categories must be an array",
        errorCode: ErrorCode.INVALID_DATA_FORMAT,
        environment: isProduction() ? 'production' : 'development'
      };
      return NextResponse.json(validationResponse, { status: 400 });
    }

    // Choose save method based on environment
    const result: MenuPersistResponse = isProduction() 
      ? await saveToGitHub(categories)
      : saveToFileSystem(categories);

    // Return appropriate HTTP status based on operation result
    const httpStatus = result.status === OperationStatus.SUCCESS ? 200 : 500;
    
    return NextResponse.json(result, { status: httpStatus });

  } catch (error: any) {
    console.error("Error in menu persist API:", error);
    
    const errorResponse: MenuPersistResponse = {
      status: OperationStatus.UNKNOWN_ERROR,
      message: "An unexpected error occurred",
      error: error.message || "Unknown error",
      environment: isProduction() ? 'production' : 'development'
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({ 
      status: "ok", 
      message: "Menu persist API endpoint",
      environment: isProduction() ? 'production' : 'development'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
