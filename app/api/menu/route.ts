// @/app/api/menu/route.ts

import { NextResponse } from "next/server";
import { contentData } from "@/app/config/content/content-data";

interface GitHubFileResponse {
  content: string;
  encoding: string;
  sha: string;
  size: number;
  type: string;
}

interface MenuResponse {
  status: string;
  categories: any[];
  source?: string;
  error?: string;
}

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

async function fetchFromGitHub(): Promise<any[]> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO;
  const GITHUB_FILE_PATH = process.env.GITHUB_FILE_PATH || 'app/config/content/content-data.ts';

  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token is not configured');
  }

  if (!GITHUB_REPO) {
    throw new Error('GitHub repository is not configured');
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
    }

    const fileData: GitHubFileResponse = await response.json();
    
    if (fileData.encoding !== 'base64') {
      throw new Error('Unexpected file encoding from GitHub API');
    }

    const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    const categories = extractCategoriesFromContent(decodedContent);
    
    return categories;

  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    throw error;
  }
}

function extractCategoriesFromContent(content: string): any[] {
  try {
    const categoriesMatch = content.match(/categories:\s*(\[[\s\S]*?\])\s*\}/);
    
    if (!categoriesMatch) {
      throw new Error('Could not find categories data in file content');
    }

    const categoriesString = categoriesMatch[1];
    
    const cleanedString = categoriesString
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .trim();

    const categories = JSON.parse(cleanedString);
    
    if (!Array.isArray(categories)) {
      throw new Error('Categories data is not an array');
    }

    return categories;

  } catch (error) {
    console.error('Error parsing categories from content:', error);
    
    const jsonMatch = content.match(/(\[[\s\S]*\])/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (fallbackError) {
        console.error('Fallback parsing also failed:', fallbackError);
      }
    }
    
    throw new Error('Unable to extract categories from file content');
  }
}

function fetchFromFileSystem(): any[] {
  try {
    return contentData.categories;
  } catch (error) {
    console.error('Error fetching from filesystem:', error);
    throw new Error('Failed to load categories from filesystem');
  }
}

export async function GET(): Promise<NextResponse<MenuResponse>> {
  try {
    let categories: any[];
    let source: string;

    if (isProduction()) {
      console.log('Fetching menu data from GitHub (production)');
      categories = await fetchFromGitHub();
      source = 'github';
    } else {
      console.log('Fetching menu data from filesystem (development)');
      categories = fetchFromFileSystem();
      source = 'filesystem';
    }

    return NextResponse.json({
      status: "ok",
      categories,
      source
    });

  } catch (error: any) {
    console.error("Error fetching menu categories:", error);
    
    const errorMessage = error.message || "Failed to fetch menu categories";
    const environment = isProduction() ? 'production' : 'development';
    
    if (isProduction() && error.message?.includes('GitHub')) {
      console.log('GitHub fetch failed, attempting filesystem fallback...');
      try {
        const fallbackCategories = fetchFromFileSystem();
        return NextResponse.json({
          status: "ok",
          categories: fallbackCategories,
          source: 'filesystem-fallback',
          error: `GitHub fetch failed: ${errorMessage}`
        });
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }

    return NextResponse.json(
      { 
        status: "error",
        error: errorMessage,
        categories: [],
        source: environment
      }, 
      { status: 500 }
    );
  }
}

export async function HEAD(): Promise<NextResponse> {
  try {
    const source = isProduction() ? 'github' : 'filesystem';
    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-Data-Source': source,
        'X-Environment': process.env.NODE_ENV || 'development'
      }
    });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
