@echo off
REM Скрипт для быстрого запуска Pekarnia v5.0.0 на Windows

echo.
echo 🍞 Pekarnia v5.0.0 - Стартовый скрипт
echo.

REM Проверяем наличие Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️ Node.js не найден
    echo.
    echo Способы запуска:
    echo.
    echo 1. Откройте index.html в браузере
    echo 2. Установите http-server: npm install -g http-server
    echo 3. Используйте VS Code с расширением Live Server
    echo.
    pause
    exit /b
)

echo ✅ Node.js найден
echo.
echo Выберите способ запуска:
echo.
echo 1 - http-server (рекомендуется)
echo 2 - Показать папку проекта
echo 3 - Открыть index.html
echo.

set /p choice="Введите номер (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Запускаю http-server...
    echo Откройте браузер: http://localhost:8080
    echo.
    call npx http-server
) else if "%choice%"=="2" (
    echo.
    echo 📁 Открываю папку проекта...
    explorer .
) else if "%choice%"=="3" (
    echo.
    echo 🌐 Открываю index.html...
    start index.html
) else (
    echo ❌ Неверный выбор
    pause
    exit /b
)
