// app/api/admin/sections/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { ExtendedSection } from '@/app/(_service)/types/section-types';

// Интерфейсы для типизации запроса и ответа
interface UploadRequestBody {
  href: string; // Изменено с category/filename на href
  sections: ExtendedSection[];
}

interface FileSystemResponse {
  success: boolean;
  message: string;
  filePath?: string;
}

// Парсинг href в компоненты пути
function parseHref(href: string): { firstPartHref: string; secondPartHref: string } {
  console.log('🔍 Parsing href:', href);
  
  // Очищаем href от начального слеша
  const cleanHref = href.startsWith('/') ? href.slice(1) : href;
  
  // Разделяем по слешу
  const parts = cleanHref.split('/').filter(part => part.length > 0);
  
  if (parts.length < 2) {
    throw new Error(`Invalid href format. Expected format: "/firstPart/secondPart", got: "${href}"`);
  }
  
  const firstPartHref = parts[0];
  const secondPartHref = parts[1];
  
  console.log('📁 Parsed parts:', { firstPartHref, secondPartHref });
  
  return { firstPartHref, secondPartHref };
}

// Валидация входных данных
function validateRequestBody(body: any): body is UploadRequestBody {
  console.log('✅ Validating request body...');
  
  if (!body || typeof body !== 'object') {
    throw new Error('Request body must be an object');
  }

  const { href, sections } = body;

  // Проверка наличия обязательных полей
  if (!href || typeof href !== 'string' || href.trim() === '') {
    throw new Error('href is required and must be a non-empty string');
  }

  if (!sections || !Array.isArray(sections)) {
    throw new Error('sections must be an array');
  }

  // Валидация формата href
  const hrefRegex = /^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
  if (!hrefRegex.test(href)) {
    throw new Error('href must match format "/category/subcategory" with only letters, numbers, hyphens, and underscores');
  }

  // Базовая валидация структуры секций
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (!section || typeof section !== 'object') {
      throw new Error(`Section at index ${i} must be an object`);
    }
    if (!section.id || typeof section.id !== 'string') {
      throw new Error(`Section at index ${i} must have a string "id" property`);
    }
    if (!section.bodyContent || typeof section.bodyContent !== 'object') {
      throw new Error(`Section at index ${i} must have a "bodyContent" object`);
    }
  }

  console.log('✅ Request body validation passed');
  return true;
}

// Валидация имени файла/директории (безопасность)
function validateSafeName(name: string, fieldName: string): void {
  const safeNameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!safeNameRegex.test(name)) {
    throw new Error(`${fieldName} contains invalid characters. Only letters, numbers, hyphens, and underscores are allowed`);
  }
}

// Генерация содержимого TypeScript файла
function generateTypeScriptFile(filename: string, sections: ExtendedSection[]): string {
  const importStatement = `import { ExtendedSection } from "@/app/(_service)/types/section-types";`;
  
  // Используем camelCase для имени переменной
  const variableName = filename.replace(/-/g, '');
  const dataVariable = `const ${variableName}Sections: ExtendedSection[] = ${JSON.stringify(sections, null, 2)};`;
  
  const exportStatement = `export default ${variableName}Sections;`;
  
  const fileContent = [
    '// Auto-generated file - do not edit manually',
    `// Generated on: ${new Date().toISOString()}`,
    `// Source href: ${filename}`,
    '',
    importStatement,
    '',
    dataVariable,
    '',
    exportStatement,
    ''
  ].join('\n');

  return fileContent;
}

// Создание директории если она не существует
async function ensureDirectoryExists(dirPath: string): Promise<void> {
  if (!existsSync(dirPath)) {
    console.log('📁 Creating directory:', dirPath);
    await mkdir(dirPath, { recursive: true });
  }
}

// POST handler для загрузки секций
export async function POST(request: NextRequest): Promise<NextResponse<FileSystemResponse>> {
  console.log('🔄 API Route: /api/admin/sections/upload');
  console.log('📝 Request method:', request.method);
  console.log('🌐 Request URL:', request.url);
  console.log('📋 Request headers:', Object.fromEntries(request.headers.entries()));

  try {
    // Парсинг тела запроса
    let body;
    let rawBody: string;
    
    try {
      rawBody = await request.text();
      console.log('📦 Request body length:', rawBody.length);
      console.log('📦 Request body preview:', rawBody.substring(0, 200) + '...');
      
      body = JSON.parse(rawBody);
      console.log('✅ JSON parsed successfully');
    } catch (error) {
      console.error('❌ JSON parse error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body',
          details: error instanceof Error ? error.message : 'Unknown parsing error'
        },
        { status: 400 }
      );
    }

    // Валидация данных
    try {
      validateRequestBody(body);
    } catch (error) {
      console.error('❌ Validation error:', error);
      return NextResponse.json(
        {
          success: false,
          message: error instanceof Error ? error.message : 'Validation failed'
        },
        { status: 400 }
      );
    }

    const { href, sections } = body as UploadRequestBody;
    console.log('📊 Sections count:', sections.length);

    // Парсинг href в компоненты пути
    let firstPartHref: string;
    let secondPartHref: string;

    try {
      const parsed = parseHref(href);
      firstPartHref = parsed.firstPartHref;
      secondPartHref = parsed.secondPartHref;
    } catch (error) {
      console.error('❌ Href parsing error:', error);
      return NextResponse.json(
        {
          success: false,
          message: error instanceof Error ? error.message : 'Invalid href format'
        },
        { status: 400 }
      );
    }

    // Валидация безопасности имен
    try {
      validateSafeName(firstPartHref, 'First part of href');
      validateSafeName(secondPartHref, 'Second part of href');
    } catch (error) {
      console.error('❌ Name validation error:', error);
      return NextResponse.json(
        {
          success: false,
          message: error instanceof Error ? error.message : 'Invalid name format'
        },
        { status: 400 }
      );
    }

    // Определение путей для сохранения
    const contentDir = join(process.cwd(), 'app', 'config', 'content', 'sections');
    const firstPartDir = join(contentDir, firstPartHref);
    const filePath = join(firstPartDir, `${secondPartHref}.ts`);
    const relativeFilePath = `app/config/content/sections/${firstPartHref}/${secondPartHref}.ts`;

    console.log('📁 Target directory:', firstPartDir);
    console.log('📄 Target file:', filePath);

    // Создание директорий если не существуют
    try {
      await ensureDirectoryExists(contentDir);
      await ensureDirectoryExists(firstPartDir);
    } catch (error) {
      console.error('❌ Directory creation error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create directories'
        },
        { status: 500 }
      );
    }

    // Генерация содержимого файла
    const fileContent = generateTypeScriptFile(secondPartHref, sections);

    // Сохранение файла
    try {
      await writeFile(filePath, fileContent, 'utf-8');
      console.log('✅ File saved successfully:', relativeFilePath);
    } catch (error) {
      console.error('❌ File write error:', error);
      throw error; // Передаем ошибку для обработки в общем catch блоке
    }

    console.log('✅ Processing completed successfully');

    // Успешный ответ
    return NextResponse.json(
      {
        success: true,
        message: `Sections successfully saved to ${relativeFilePath}`,
        filePath: relativeFilePath
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

  } catch (error) {
    console.error('❌ Server error:', error);
    
    // Обработка специфичных ошибок файловой системы
    if (error instanceof Error) {
      if (error.message.includes('EACCES')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Permission denied: Unable to write to file system'
          },
          { status: 500 }
        );
      }

      if (error.message.includes('ENOSPC')) {
        return NextResponse.json(
          {
            success: false,
            message: 'No space left on device'
          },
          { status: 500 }
        );
      }

      if (error.message.includes('ENOTDIR')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Directory path is invalid'
          },
          { status: 500 }
        );
      }
    }

    // Общая ошибка
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// GET handler для получения информации о существующих файлах
export async function GET(request: NextRequest): Promise<NextResponse> {
  console.log('🔄 GET /api/admin/sections/upload');
  
  try {
    const { searchParams } = new URL(request.url);
    const href = searchParams.get('href');
    
    if (!href) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'href parameter is required' 
        },
        { status: 400 }
      );
    }

    // Парсим href
    const { firstPartHref } = parseHref(href);
    const categoryDir = join(process.cwd(), 'app', 'config', 'content', 'sections', firstPartHref);
    
    if (!existsSync(categoryDir)) {
      return NextResponse.json({
        success: true,
        message: 'Category directory does not exist',
        files: []
      });
    }

    // Получение списка файлов в категории (опционально)
    return NextResponse.json({
      success: true,
      message: 'Directory exists',
      categoryDir: categoryDir
    });

  } catch (error) {
    console.error('❌ Error in GET sections:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}
