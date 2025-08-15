// @/app/api/menu/route.ts

import { NextResponse } from "next/server";

// GitHub API configuration from environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_FILE_PATH = process.env.GITHUB_FILE_PATH || "config/content/content-data.ts";
const MENU_CACHE_TTL = parseInt(process.env.MENU_CACHE_TTL || "300000"); // 5 minutes default

// Simple in-memory cache for menu data
let menuCache: {
  data: any | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

/**
 * Загружает и парсит содержимое файла content-data.ts из GitHub репозитория
 * @returns Promise с объектом contentData
 */
async function fetchContentDataFromGitHub(): Promise<any> {
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    throw new Error("GitHub configuration missing: GITHUB_TOKEN and GITHUB_REPO are required");
  }

  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

  const response = await fetch(apiUrl, {
    headers: {
      "Authorization": `Bearer ${GITHUB_TOKEN}`,
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "NextJS-App"
    }
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Content data file not found in repository");
    }
    if (response.status === 401) {
      throw new Error("GitHub authentication failed");
    }
    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded or insufficient permissions");
    }
    
    const errorData = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();

  if (!data.content) {
    throw new Error("No content found in GitHub file response");
  }

  // Декодируем base64 содержимое файла
  const buffer = Buffer.from(data.content, "base64");
  const fileContent = buffer.toString("utf-8");

  // Извлекаем contentData из TypeScript файла
  // Ищем экспорт: export const contentData = { ... };
  const contentDataMatch = fileContent.match(/export\s+const\s+contentData\s*=\s*(\{[\s\S]*?\});/);

  if (!contentDataMatch) {
    throw new Error("Could not parse contentData from file - invalid format");
  }

  // Парсим содержимое (eval может быть небезопасен в production)
  const contentDataCode = contentDataMatch[1];
  const contentData = eval(`(${contentDataCode})`);
  
  return contentData;
}

/**
 * Получает данные меню с кэшированием
 * @returns Promise с объектом contentData
 */
async function getCachedContentData(): Promise<any> {
  const now = Date.now();
  
  // Проверяем, актуален ли кэш
  if (menuCache.data && (now - menuCache.timestamp) < MENU_CACHE_TTL) {
    return menuCache.data;
  }

  // Загружаем свежие данные из GitHub
  const contentData = await fetchContentDataFromGitHub();
  
  // Обновляем кэш
  menuCache.data = contentData;
  menuCache.timestamp = now;
  
  return contentData;
}

export async function GET() {
  try {
    const contentData = await getCachedContentData();
    
    return NextResponse.json({
      status: "ok",
      categories: contentData.categories
    });
    
  } catch (e: any) {
    console.error("Error fetching menu categories from GitHub:", e);
    
    return NextResponse.json(
      { 
        error: "Failed to fetch menu categories",
        details: e.message 
      }, 
      { status: 500 }
    );
  }
}
