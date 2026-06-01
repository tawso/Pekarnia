export class UIManager {
    constructor(scene, gameState) {
        this.scene = scene;
        this.gameState = gameState;
        this.isMobile = window.innerWidth < 768;
        
        this.topBar = null;
        this.shopPanel = null;
        this.mainButton = null;
        this.upgradesList = null;
        
        this.updateInterval = null;
    }

    create() {
        try {
            this.setupResponsive();
            this.createTopBar();
            this.createMainButton();
            this.createShopPanel();
            this.createUpgradesList();
            this.createMenuButton();
            this.startUpdating();
            console.log('✅ UIManager создан успешно');
        } catch (e) {
            console.error('❌ Ошибка в UIManager:', e);
            console.error(e.stack);
        }
    }

    setupResponsive() {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;
        
        // Сохраняем параметры экрана
        this.screenWidth = width;
        this.screenHeight = height;
        this.isMobile = width < 768;
        
        console.log(`📐 Экран: ${width}x${height} (${this.isMobile ? 'Mobile' : 'Desktop'})`);
    }

    createTopBar() {
        const width = this.screenWidth;
        const padding = this.isMobile ? 10 : 20;
        const barHeight = this.isMobile ? 60 : 80;
        
        // Background
        const bgBar = this.scene.add.rectangle(
            width / 2,
            barHeight / 2,
            width,
            barHeight,
            0x2a1810
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0);
        
        // Хлеб
        const breadX = padding + 50;
        const breadTextSize = this.isMobile ? 20 : 28;
        
        this.breadIcon = this.scene.add.text(
            padding,
            barHeight / 2,
            '🍞',
            { fontSize: this.isMobile ? '24px' : '32px' }
        ).setOrigin(0, 0.5).setScrollFactor(0, 0);
        
        this.breadText = this.scene.add.text(
            breadX,
            barHeight / 2,
            '0',
            { fontSize: breadTextSize + 'px', fill: '#ffd700', fontStyle: 'bold' }
        ).setOrigin(0, 0.5).setScrollFactor(0, 0);
        
        // Золотой хлеб
        const goldenX = breadX + 120;
        this.goldenBreadIcon = this.scene.add.text(
            goldenX,
            barHeight / 2,
            '⭐',
            { fontSize: this.isMobile ? '20px' : '24px' }
        ).setOrigin(0, 0.5).setScrollFactor(0, 0);
        
        this.goldenBreadText = this.scene.add.text(
            goldenX + 35,
            barHeight / 2,
            '0',
            { fontSize: (breadTextSize - 4) + 'px', fill: '#ffff00', fontStyle: 'bold' }
        ).setOrigin(0, 0.5).setScrollFactor(0, 0);
        
        // ПС (Хлеба в секунду)
        const ppsX = width / 2;
        this.ppsText = this.scene.add.text(
            ppsX,
            barHeight / 2,
            'ПС: 0',
            { fontSize: (breadTextSize - 4) + 'px', fill: '#ffaa44' }
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0);
        
        // Уровень
        const levelX = width - padding - 80;
        this.levelText = this.scene.add.text(
            levelX,
            barHeight / 2,
            'Lvl 1',
            { fontSize: breadTextSize + 'px', fill: '#88ff88' }
        ).setOrigin(0, 0.5).setScrollFactor(0, 0);
        
        this.topBar = {
            bg: bgBar,
            breadIcon: this.breadIcon,
            breadText: this.breadText,
            goldenBreadIcon: this.goldenBreadIcon,
            goldenBreadText: this.goldenBreadText,
            ppsText: this.ppsText,
            levelText: this.levelText
        };
    }

    createMainButton() {
        const width = this.screenWidth;
        const height = this.screenHeight;
        
        const buttonY = height * 0.35;
        const buttonSize = this.isMobile ? 80 : 120;
        
        // Кнопка клика
        this.mainButton = this.scene.add.text(
            width / 2,
            buttonY,
            '🍞',
            { fontSize: (buttonSize) + 'px' }
        )
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.handleClick())
        .on('pointerover', () => this.mainButton.setScale(1.1))
        .on('pointerout', () => this.mainButton.setScale(1))
        .setScrollFactor(0, 0);
        
        // Текст с силой клика
        const clickPowerY = buttonY + (buttonSize / 2) + 30;
        this.clickPowerText = this.scene.add.text(
            width / 2,
            clickPowerY,
            `+${this.gameState.clickPower}`,
            { fontSize: '24px', fill: '#ffaa44', fontStyle: 'bold' }
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0);
    }

    createShopPanel() {
        const width = this.screenWidth;
        const height = this.screenHeight;
        
        const panelX = this.isMobile ? 0 : (width * 0.65);
        const panelY = height * 0.15;
        const panelWidth = this.isMobile ? width : (width * 0.35);
        const panelHeight = height * 0.7;
        
        // Background
        const bg = this.scene.add.rectangle(
            panelX + panelWidth / 2,
            panelY + panelHeight / 2,
            panelWidth,
            panelHeight,
            0x1a0f08
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setStrokeStyle(2, 0x8b4513);
        
        // Заголовок
        const titleSize = this.isMobile ? 18 : 24;
        const title = this.scene.add.text(
            panelX + 10,
            panelY + 10,
            'Улучшения',
            { fontSize: titleSize + 'px', fill: '#ffd700', fontStyle: 'bold' }
        ).setOrigin(0, 0).setScrollFactor(0, 0);
        
        this.shopPanel = {
            bg,
            title,
            x: panelX,
            y: panelY + 50,
            width: panelWidth,
            height: panelHeight - 60,
            upgrades: []
        };
    }

    createUpgradesList() {
        const scrollY = this.shopPanel.y;
        const itemHeight = this.isMobile ? 60 : 80;
        const maxItems = Math.floor(this.shopPanel.height / itemHeight);
        
        this.gameState.upgrades.forEach((upgrade, index) => {
            if (index >= maxItems) return;
            
            const y = scrollY + (index * itemHeight);
            const x = this.shopPanel.x + 10;
            const width = this.shopPanel.width - 20;
            
            // Контейнер
            const bg = this.scene.add.rectangle(
                x + width / 2,
                y + itemHeight / 2,
                width,
                itemHeight - 5,
                0x2a1810
            ).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setInteractive({ useHandCursor: true });
            
            bg.on('pointerdown', () => this.buyUpgrade(upgrade.id));
            bg.on('pointerover', () => bg.setFillStyle(0x3a2810));
            bg.on('pointerout', () => bg.setFillStyle(0x2a1810));
            
            // Иконка
            const icon = this.scene.add.text(
                x + 10,
                y + itemHeight / 2,
                upgrade.icon,
                { fontSize: '28px' }
            ).setOrigin(0, 0.5).setScrollFactor(0, 0);
            
            // Информация
            const infoX = x + 50;
            const name = this.scene.add.text(
                infoX,
                y + 10,
                `${upgrade.name} x${upgrade.owned}`,
                { fontSize: this.isMobile ? '12px' : '14px', fill: '#ffff99', fontStyle: 'bold' }
            ).setOrigin(0, 0).setScrollFactor(0, 0);
            
            // Стоимость
            const cost = this.scene.add.text(
                infoX,
                y + itemHeight - 20,
                `Стоимость: ${upgrade.cost}`,
                { fontSize: this.isMobile ? '11px' : '12px', fill: '#ffaa44' }
            ).setOrigin(0, 0).setScrollFactor(0, 0);
            
            // Доход в секунду
            const bps = this.scene.add.text(
                infoX,
                y + itemHeight - 35,
                `${upgrade.bps} хл/сек`,
                { fontSize: this.isMobile ? '11px' : '12px', fill: '#88ff88' }
            ).setOrigin(0, 0).setScrollFactor(0, 0);
            
            // Сохраняем для обновления
            this.shopPanel.upgrades.push({
                upgrade,
                bg,
                icon,
                name,
                cost,
                bps
            });
        });
    }

    handleClick() {
        this.gameState.click();
        this.showClickEffect();
    }

    showClickEffect() {
        const x = this.screenWidth / 2;
        const y = this.screenHeight * 0.35;
        
        const effect = this.scene.add.text(
            x,
            y,
            `+${this.gameState.clickPower}`,
            { fontSize: '32px', fill: '#ffff00', fontStyle: 'bold' }
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0);
        
        this.scene.tweens.add({
            targets: effect,
            y: y - 50,
            alpha: 0,
            duration: 500,
            onComplete: () => effect.destroy()
        });
    }

    buyUpgrade(id) {
        if (this.gameState.buyUpgrade(id)) {
            this.updateUI();
        }
    }

    startUpdating() {
        this.updateInterval = setInterval(() => {
            this.updateUI();
        }, 100);
    }

    updateUI() {
        // Обновляем хлеб
        this.breadText.setText(this.formatNumber(this.gameState.bread));
        
        // Обновляем золотой хлеб
        this.goldenBreadText.setText(this.gameState.goldenBread);
        
        this.clickPowerText.setText(`+${this.gameState.clickPower}`);
        
        // Обновляем ПС
        const pps = this.calculatePPS();
        this.ppsText.setText(`ПС: ${this.formatNumber(pps)}`);
        
        // Обновляем уровень
        this.levelText.setText(`Lvl ${this.gameState.level}`);
        
        // Обновляем список улучшений
        this.shopPanel.upgrades.forEach(item => {
            const { upgrade, name, cost, bps } = item;
            const currentUpgrade = this.gameState.upgrades.find(u => u.id === upgrade.id);
            
            if (currentUpgrade) {
                name.setText(`${currentUpgrade.name} x${currentUpgrade.owned}`);
                cost.setText(`Стоимость: ${currentUpgrade.cost}`);
                
                // Если позволяем купить - зеленый, иначе красный
                if (this.gameState.bread >= currentUpgrade.cost) {
                    item.bg.setFillStyle(0x3a2810);
                } else {
                    item.bg.setFillStyle(0x2a1810);
                }
            }
        });
    }

    calculatePPS() {
        return this.gameState.upgrades.reduce((sum, upgrade) => {
            return sum + (upgrade.owned * upgrade.bps);
        }, 0);
    }

    formatNumber(num) {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return Math.floor(num).toString();
    }

    createMenuButton() {
        const width = this.screenWidth;
        const menuButtonX = width - 40;
        const menuButtonY = 40;
        
        // Кнопка меню
        const menuBtn = this.scene.add.text(
            menuButtonX,
            menuButtonY,
            '⚙️',
            { fontSize: '28px' }
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setInteractive({ useHandCursor: true });
        
        menuBtn.on('pointerover', () => menuBtn.setScale(1.1));
        menuBtn.on('pointerout', () => menuBtn.setScale(1));
        menuBtn.on('pointerdown', () => this.showMenu());
        
        this.menuButton = menuBtn;
    }

    showMenu() {
        // Простое меню статистики
        const width = this.screenWidth;
        const height = this.screenHeight;
        
        // Панель информации
        const panelX = this.isMobile ? 10 : (width * 0.1);
        const panelY = this.isMobile ? height * 0.5 : (height * 0.2);
        const panelWidth = this.isMobile ? width - 20 : 200;
        
        const statsBg = this.scene.add.rectangle(
            panelX + panelWidth / 2,
            panelY,
            panelWidth,
            300,
            0x1a0f08
        ).setOrigin(0.5, 0).setScrollFactor(0, 0).setStrokeStyle(2, 0x8b4513);
        
        const statsTitle = this.scene.add.text(
            panelX + 10,
            panelY + 10,
            '📊 СТАТИСТИКА',
            { fontSize: '16px', fill: '#ffd700', fontStyle: 'bold' }
        ).setOrigin(0, 0).setScrollFactor(0, 0);
        
        const stats = [
            `🍞 Всего: ${this.formatNumber(this.gameState.totalBread)}`,
            `⭐ Золотой: ${this.gameState.totalGoldenBread}`,
            `👆 Кликов: ${this.gameState.clicks}`,
            `⭐ Уровень: ${this.gameState.level}`,
            `✨ Престиж: ${this.gameState.prestigePoints}`,
            `📈 Множитель: x${this.gameState.prestigeMultiplier.toFixed(2)}`
        ];
        
        let y = panelY + 40;
        const statsTexts = [];
        
        stats.forEach((stat, i) => {
            const txt = this.scene.add.text(
                panelX + 10,
                y,
                stat,
                { fontSize: '12px', fill: '#ffff99' }
            ).setOrigin(0, 0).setScrollFactor(0, 0);
            statsTexts.push(txt);
            y += 35;
        });
        
        // Кнопка закрытия
        const closeBtn = this.scene.add.text(
            panelX + panelWidth - 15,
            panelY + 10,
            'X',
            { fontSize: '16px', fill: '#ff4444', fontStyle: 'bold' }
        ).setOrigin(0.5, 0).setScrollFactor(0, 0).setInteractive({ useHandCursor: true });
        
        const closeMenu = () => {
            statsBg.destroy();
            statsTitle.destroy();
            statsTexts.forEach(t => t.destroy());
            closeBtn.destroy();
        };
        
        closeBtn.on('pointerdown', closeMenu);
    }

    handleWindowResize() {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const wasX = this.isMobile;
        const isMobileNow = newWidth < 768;
        
        if (wasX !== isMobileNow) {
            // Переорганизация UI при смене ориентации
            this.destroy();
            this.create();
        }
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}
