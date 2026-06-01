# 🔧 Исправление ошибок - Чёрный экран

## Проблема
Игра не отображается (чёрный экран) при запуске на http-server.

## Причина
- Проблемы с инициализацией UIManager
- Возможные ошибки при загрузке модулей
- Конфигурация Phaser требует уточнения

## Решение

### Шаг 1: Обновите index.html
✅ Обновлена версия с debug-панелью и обработкой ошибок

### Шаг 2: Перезагрузите браузер
```
Ctrl+Shift+R (очистка кэша) или Cmd+Shift+R (macOS)
```

### Шаг 3: Откройте консоль (F12)
```
F12 → Console tab
```

Вы должны увидеть логи:
```
🚀 Инициализация...
📦 Загрузка модулей...
🎮 Создание Phaser.Game...
✅ Phaser инициализирован
📐 Экран: 1920x1080 (Desktop)
✅ GameState инициализирован
✅ Менеджеры инициализированы
✅ UIManager создан успешно
✅ UI создан
🎮 GameScene полностью инициализирована!
```

### Шаг 4: Если есть ошибки
В консоли должны видеться детальные ошибки:
```
❌ ERROR: [описание ошибки]
📍 [файл]:[строка]
```

### Шаг 5: Перезапустите http-server

**Windows:**
```bash
# Закройте текущий http-server (Ctrl+C)
cd C:\Games\Pekarnia\my-clicker
npx http-server
# Откройте браузер на http://localhost:8080
```

**macOS/Linux:**
```bash
# Закройте текущий http-server (Ctrl+C)
cd ~/Games/Pekarnia/my-clicker
npx http-server
# Откройте браузер на http://localhost:8080
```

### Шаг 6: Debug панель
В правом верхнем углу должна быть зелёная панель с логами. Она показывает:
- Последние 50 событий инициализации
- Все ошибки
- Статус загрузки

## Если всё ещё не работает

### Проверьте:
1. **Консоль браузера (F12)**
   - Красные ошибки в Console?
   - 404 errors в Network?

2. **Сеть (F12 → Network)**
   - Все файлы загружаются? (200 OK)
   - Нет 404 или ошибок?

3. **localStorage очистка**
   ```javascript
   // В консоли выполните:
   localStorage.clear()
   location.reload()
   ```

4. **Полная очистка браузера**
   ```
   Ctrl+Shift+Delete → очистить всё → перезагрузить
   ```

## Тестовые сценарии

### Минимальный тест
```javascript
// Откройте консоль (F12) и выполните:
console.log('Phaser version:', Phaser.VERSION);
console.log('Game:', typeof Phaser.Game);
```

Должны увидеть:
```
Phaser version: 3.90.0
Game: function
```

### Проверка модулей
```javascript
// В консоли:
import('./src/core/GameState.js').then(m => console.log('GameState OK'));
```

Должно вывести:
```
GameState OK
```

## Файлы которые были исправлены

1. ✅ `index.html` - Добавлена debug-панель
2. ✅ `src/main.js` - Добавлены логи и конфиг
3. ✅ `src/scenes/GameScene.js` - Добавлены try-catch
4. ✅ `src/ui/UIManager.js` - Добавлены логи

## Что изменилось

**Before:**
```javascript
// Нет логирования ошибок
// Чёрный экран без информации
```

**After:**
```javascript
// Подробные логи в консоли
// Debug-панель в браузере
// Try-catch для перехвата ошибок
console.log('✅ ...');
```

## Если проблема не решена

1. **Поделитесь ошибкой из консоли** (скриншот или текст)
2. **URL сервера** (например, http://localhost:8080)
3. **ОС и браузер** (Windows Chrome, macOS Safari, и т.д.)

---

## Быстрая проверка

Выполните в консоли:
```javascript
// Проверка Phaser
console.log('✅ Phaser OK:', !!Phaser);

// Проверка конфига
console.log('✅ Canvas:', document.querySelector('canvas'));

// Проверка GameState
console.log('✅ localStorage:', !!localStorage);
```

Если все вернут `true` / объект - система работает!

---

**Статус:** Исправления готовы, перезагрузите браузер! 🚀
