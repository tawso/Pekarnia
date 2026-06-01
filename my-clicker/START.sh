#!/bin/bash
# Скрипт для быстрого запуска Pekarnia v5.0.0

echo "🍞 Запуск Pekarnia v5.0.0..."
echo ""

# Проверяем Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js найден"
    echo ""
    echo "Выберите вариант запуска:"
    echo "1) http-server (рекомендуется)"
    echo "2) Только показать папку"
    echo ""
    read -p "Ваш выбор (1 или 2): " choice
    
    case $choice in
        1)
            echo ""
            echo "🚀 Запускаю http-server..."
            echo "Откройте браузер и перейдите на: http://localhost:8080"
            echo ""
            npx http-server
            ;;
        2)
            echo ""
            echo "📁 Папка проекта:"
            pwd
            echo ""
            echo "Откройте index.html в браузере"
            ;;
        *)
            echo "❌ Неверный выбор"
            ;;
    esac
else
    echo "⚠️ Node.js не найден"
    echo "Откройте файл index.html в браузере напрямую"
fi
