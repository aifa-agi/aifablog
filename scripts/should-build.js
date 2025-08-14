#!/usr/bin/env node

// Скрипт для определения нужно ли делать билд
// exit 0 = НЕ делать билд (игнорировать)
// exit 1 = делать билд

const { execSync } = require('child_process');

console.log('🔍 Checking if build should proceed...');

try {
  // Получаем последнее коммит сообщение
  const commitMessage = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
  console.log(`📝 Commit message: "${commitMessage}"`);
  
  // Получаем автора коммита  
  const commitAuthor = execSync('git log -1 --pretty=%an', { encoding: 'utf8' }).trim();
  console.log(`👤 Commit author: "${commitAuthor}"`);
  
  // Проверяем есть ли специальный тег для ручного деплоя
  if (commitMessage.includes('[manual-deploy]') || commitMessage.includes('[deploy]')) {
    console.log('✅ Manual deploy tag found - BUILDING');
    process.exit(1); // Делать билд
  }
  
  // Проверяем переменную окружения (устанавливается через API)
  if (process.env.VERCEL_MANUAL_DEPLOY === 'true') {
    console.log('✅ Manual deploy environment variable found - BUILDING');
    process.exit(1); // Делать билд
  }
  
  // Проверяем автора коммита (исключаем автоматические коммиты)
  const excludedAuthors = ['github-actions[bot]', 'dependabot[bot]', 'renovate[bot]'];
  if (excludedAuthors.includes(commitAuthor)) {
    console.log('🚫 Bot commit detected - SKIPPING build');
    process.exit(0); // НЕ делать билд
  }
  
  // Все остальные коммиты игнорируем (обычные Git push'ы)
  console.log('🚫 Regular Git push detected - SKIPPING build');
  process.exit(0); // НЕ делать билд
  
} catch (error) {
  console.error('❌ Error checking build conditions:', error.message);
  // В случае ошибки не делаем билд
  process.exit(0);
}
