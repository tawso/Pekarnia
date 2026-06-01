import { GameState } from '../core/GameState.js';
import { SaveManager } from '../core/SaveManager.js';
import { UIManager } from '../ui/UIManager.js';
import { AchievementManager } from '../core/AchievementManager.js';
import { QuestManager } from '../core/QuestManager.js';
import { OfflineRewardWindow } from '../ui/OfflineRewardWindow.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        console.log('📦 Preload...');
    }

    create() {
        try {
            console.log('🎮 Создание сцены GameScene...');
            
            // Инициализируем состояние игры
            this.gameState = new GameState();
            SaveManager.load(this.gameState);
            console.log('✅ GameState инициализирован');

            // Обработка оффлайн дохода
            const offlineEarnings = SaveManager.calculateOfflineEarnings(this.gameState);
            if (offlineEarnings > 0) {
                this.gameState.addOfflineIncome(offlineEarnings);
                console.log(`💰 Оффлайн доход: ${offlineEarnings} хлеба`);
                
                // Показываем окно
                const rewardWindow = new OfflineRewardWindow(this, offlineEarnings);
                this.time.delayedCall(500, () => rewardWindow.show());
            }

            // Менеджеры
            this.achievementManager = new AchievementManager(this.gameState);
            this.questManager = new QuestManager(this.gameState);
            console.log('✅ Менеджеры инициализированы');

            // Создаём UI
            this.uiManager = new UIManager(this, this.gameState);
            this.uiManager.create();
            console.log('✅ UI создан');

            // Автосохранение каждые 5 секунд
            this.autoSaveEvent = this.time.addTimer({
                delay: 5000,
                callback: this.saveGame,
                callbackScope: this,
                loop: true
            });

            // Пассивный доход каждую секунду
            this.incomeEvent = this.time.addTimer({
                delay: 1000,
                callback: this.addPassiveIncome,
                callbackScope: this,
                loop: true
            });

            // Проверка достижений каждые 0.5 сек
            this.achievementCheckEvent = this.time.addTimer({
                delay: 500,
                callback: this.checkAchievements,
                callbackScope: this,
                loop: true
            });

            // Обработка ресайза окна для мобильности
            this.scale.on('resize', () => {
                this.uiManager.handleWindowResize();
            });

            console.log('🎮 GameScene полностью инициализирована!');
        } catch (e) {
            console.error('❌ ОШИБКА в GameScene.create():', e);
            console.error('Stack:', e.stack);
        }
    }

    addPassiveIncome() {
        const pps = this.uiManager.calculatePPS();
        if (pps > 0) {
            this.gameState.bread += pps;
            this.gameState.totalBread += pps;
            this.gameState.addExp(pps);
        }
        
        // Обновляем квесты
        this.questManager.update();
    }

    checkAchievements() {
        const newAchievements = this.achievementManager.check();
        if (newAchievements.length > 0) {
            newAchievements.forEach(ach => {
                console.log(`🏆 ${ach.icon} ${ach.name}`);
            });
        }
    }

    saveGame() {
        SaveManager.save(
            this.gameState,
            this.achievementManager.serialize(),
            this.questManager.serialize()
        );
        console.log('💾 Игра сохранена');
    }

    update() {
        // Основной цикл обновления если понадобится
    }
}