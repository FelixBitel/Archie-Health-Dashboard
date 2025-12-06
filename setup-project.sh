#!/bin/bash

# 🐕 Archie Health Dashboard - Автоматическая установка
# Этот скрипт создаст все необходимые файлы для проекта

echo "🐕 Создание проекта Archie Health Dashboard..."
echo ""

# Создание структуры папок
echo "📁 Создание структуры папок..."
mkdir -p src/data
mkdir -p src/components
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p public
mkdir -p .github/workflows

# ======================
# PACKAGE.JSON
# ======================
cat > package.json << 'EOF'
{
  "name": "archie-health-dashboard",
  "version": "1.0.0",
  "description": "Панель управления здоровьем домашнего питомца с ИИ-помощником",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.3",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.7",
    "vite": "^5.3.4"
  },
  "keywords": [
    "pet",
    "health",
    "dashboard",
    "ai",
    "claude",
    "veterinary"
  ],
  "author": "Your Name",
  "license": "MIT"
}
EOF

# ======================
# VITE.CONFIG.JS
# ======================
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
EOF

# ======================
# TAILWIND.CONFIG.JS
# ======================
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
EOF

# ======================
# POSTCSS.CONFIG.JS
# ======================
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# ======================
# INDEX.HTML
# ======================
cat > index.html << 'EOF'
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/dog-icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Панель управления здоровьем домашнего питомца Арчи с ИИ-помощником" />
    <meta name="keywords" content="здоровье питомца, ветеринария, уход за собакой, ИИ помощник" />
    <title>🐕 Archie Health Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

# ======================
# SRC/MAIN.JSX
# ======================
cat > src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# ======================
# SRC/INDEX.CSS
# ======================
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100vh;
}

/* Кастомные стили для скроллбара */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
EOF

# ======================
# .GITIGNORE
# ======================
cat > .gitignore << 'EOF'
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production

# Build files
build
.cache

# OS files
Thumbs.db
EOF

# ======================
# Проверка и перемещение App.jsx
# ======================
echo ""
echo "📝 Настройка App.jsx..."

# Проверяем, есть ли уже remixed файл
if [ -f "remixed-9e9a32f3.tsx" ]; then
    echo "   Найден remixed-9e9a32f3.tsx, перемещаем в src/App.jsx..."
    mv remixed-9e9a32f3.tsx src/App.jsx
elif [ -f "src/App.jsx" ]; then
    echo "   ✅ src/App.jsx уже существует"
else
    echo "   ⚠️  src/App.jsx не найден!"
    echo "   Пожалуйста, скопируйте главный компонент из артефакта в src/App.jsx"
fi

# ======================
# PUBLIC FOLDER README
# ======================
cat > public/README.md << 'EOF'
# 📸 Папка для статических файлов

Добавьте сюда фотографии Арчи:

1. **archie-hero.jpg** - главное фото для заголовка (рекомендуемый размер: 1200x800px)
2. **archie-profile.jpg** - фото для профиля (рекомендуемый размер: 400x400px)
3. **dog-icon.svg** - иконка для favicon (можно скачать с iconfinder.com)

Пример структуры:
```
public/
├── archie-hero.jpg
├── archie-profile.jpg
└── dog-icon.svg
```

**Важно**: Эти файлы должны быть в формате JPG или PNG для фото, SVG для иконки.
EOF

# ======================
# Финальные сообщения
# ======================
echo ""
echo "✅ Проект создан успешно!"
echo ""
echo "📋 Следующие шаги:"
echo ""
echo "1. Установите зависимости:"
echo "   npm install"
echo ""
echo "2. Добавьте фотографии Арчи в папку public/:"
echo "   - archie-hero.jpg"
echo "   - archie-profile.jpg"
echo ""
echo "3. Убедитесь что src/App.jsx на месте (главный компонент)"
echo ""
echo "4. Запустите проект:"
echo "   npm run dev"
echo ""
echo "5. Откройте http://localhost:5173"
echo ""
echo "📚 Документация находится в файлах:"
echo "   - README.md - основная документация"
echo "   - QUICKSTART.md - быстрый старт"
echo "   - DEPLOY.md - инструкции по деплою"
echo ""
echo "🎉 Готово! Удачи с проектом!"
EOF

chmod +x setup-project.sh
```

**Теперь сохраните этот скрипт и запустите:**

```bash
# 1. Сохраните скрипт как setup-project.sh
# 2. Дайте права на выполнение:
chmod +x setup-project.sh

# 3. Запустите:
./setup-project.sh

# 4. Установите зависимости:
npm install

# 5. Добавьте фото Арчи в public/

# 6. Запустите:
npm run dev
```

**Что делает скрипт:**
✅ Создаёт всю структуру папок
✅ Создаёт все конфигурационные файлы
✅ Создаёт src/main.jsx и src/index.css
✅ Автоматически перемещает remixed файл в src/App.jsx
✅ Создаёт .gitignore
✅ Создаёт README в папке public

**После запуска вам нужно только:**
1. `npm install`
2. Добавить 2 фото Арчи в `public/`
3. `npm run dev`

Готово! Запускайте скрипт! 🚀