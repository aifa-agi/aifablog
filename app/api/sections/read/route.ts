// @/app/api/sections/read/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface ReadSectionsRequest {
  filePath: string; 
}

interface ReadSectionsResponse {
  success: boolean;
  message: string;
  sections?: any[];
}

export async function POST(request: NextRequest): Promise<NextResponse<ReadSectionsResponse>> {
  try {
    const body: ReadSectionsRequest = await request.json();
    const { filePath } = body;

    if (!filePath) {
      return NextResponse.json({
        success: false,
        message: "File path is required"
      }, { status: 400 });
    }

    // Validate file path
    const pathRegex = /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
    if (!pathRegex.test(filePath)) {
      return NextResponse.json({
        success: false,
        message: "Invalid file path format"
      }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(),  'config', 'content', 'sections', `${filePath}.ts`);

    try {
      // Check if file exists
      await fs.access(fullPath);
      
      // Read file content
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      
      // Extract sections from the TypeScript file
      // This is a simple approach - you might want to use a more robust parser
      const sectionsMatch = fileContent.match(/export const sections[^=]*=\s*(\[[\s\S]*?\]);/);
      
      if (!sectionsMatch) {
        return NextResponse.json({
          success: false,
          message: "Could not parse sections from file"
        }, { status: 500 });
      }

      // Evaluate the sections array (be careful with this in production)
      const sectionsCode = sectionsMatch[1];
      const sections = eval(sectionsCode);

      return NextResponse.json({
        success: true,
        message: "Sections loaded successfully",
        sections
      });

    } catch (fileError: any) {
      if (fileError.code === 'ENOENT') {
        // File doesn't exist - return empty sections
        return NextResponse.json({
          success: true,
          message: "No sections file found",
          sections: []
        });
      }
      
      throw fileError;
    }

  } catch (error) {
    console.error("Error reading sections:", error);
    
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }, { status: 500 });
  }
}
