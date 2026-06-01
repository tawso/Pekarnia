export class ModalWindow {
    constructor(scene, title, width = 400, height = 300) {
        this.scene = scene;
        this.title = title;
        this.width = width;
        this.height = height;
        this.isOpen = false;
        this.content = [];
    }

    open(x = this.scene.scale.width / 2, y = this.scene.scale.height / 2) {
        if (this.isOpen) return;
        this.isOpen = true;

        // Фон затемнения
        this.overlay = this.scene.add.rectangle(
            this.scene.scale.width / 2,
            this.scene.scale.height / 2,
            this.scene.scale.width,
            this.scene.scale.height,
            0x000000,
            0.5
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setInteractive();

        // Основное окно
        this.window = this.scene.add.rectangle(
            x,
            y,
            this.width,
            this.height,
            0x1a0f08
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setStrokeStyle(2, 0x8b4513);

        // Заголовок
        this.titleText = this.scene.add.text(
            x - this.width / 2 + 15,
            y - this.height / 2 + 15,
            this.title,
            { fontSize: '20px', fill: '#ffd700', fontStyle: 'bold' }
        ).setOrigin(0, 0).setScrollFactor(0, 0);

        // Кнопка закрытия
        this.closeBtn = this.scene.add.text(
            x + this.width / 2 - 20,
            y - this.height / 2 + 15,
            'X',
            { fontSize: '20px', fill: '#ff4444', fontStyle: 'bold' }
        ).setOrigin(0.5, 0).setScrollFactor(0, 0).setInteractive({ useHandCursor: true });

        this.closeBtn.on('pointerdown', () => this.close());
        this.closeBtn.on('pointerover', () => this.closeBtn.setScale(1.2));
        this.closeBtn.on('pointerout', () => this.closeBtn.setScale(1));

        this.contentContainer = this.scene.add.graphics()
            .setScrollFactor(0, 0)
            .setMask(new Phaser.Geom.Rectangle(
                x - this.width / 2 + 10,
                y - this.height / 2 + 50,
                this.width - 20,
                this.height - 70
            ));

        this.content = [];
    }

    addText(text, y, color = '#ffffff', size = '12px') {
        if (!this.isOpen) return;
        const textObj = this.scene.add.text(
            this.scene.scale.width / 2 - this.width / 2 + 20,
            y,
            text,
            { fontSize: size, fill: color, wordWrap: { width: this.width - 40 } }
        ).setOrigin(0, 0).setScrollFactor(0, 0);
        this.content.push(textObj);
        return textObj;
    }

    close() {
        if (!this.isOpen) return;
        this.isOpen = false;
        
        this.overlay.destroy();
        this.window.destroy();
        this.titleText.destroy();
        this.closeBtn.destroy();
        this.contentContainer.destroy();
        this.content.forEach(item => item.destroy());
        this.content = [];
    }
}

export class TabPanel {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tabs = [];
        this.activeTab = null;
        this.tabButtons = [];
    }

    addTab(name, icon) {
        this.tabs.push({ name, icon, content: [] });
        this.createTabButton();
        return this.tabs.length - 1;
    }

    createTabButton() {
        const tabIndex = this.tabs.length - 1;
        const tab = this.tabs[tabIndex];
        const buttonX = this.x + (tabIndex * 60) + 30;

        const bg = this.scene.add.rectangle(
            buttonX,
            this.y,
            50,
            40,
            tabIndex === 0 ? 0x3a2810 : 0x2a1810
        ).setOrigin(0.5, 0).setScrollFactor(0, 0).setInteractive({ useHandCursor: true });

        const text = this.scene.add.text(
            buttonX,
            this.y + 20,
            `${tab.icon}\n${tab.name}`,
            { fontSize: '10px', fill: '#ffff99', align: 'center' }
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0);

        bg.on('pointerdown', () => this.switchTab(tabIndex));

        this.tabButtons.push({ bg, text });

        if (tabIndex === 0) {
            this.activeTab = 0;
        }
    }

    switchTab(index) {
        if (this.activeTab === index) return;
        
        // Обновляем визуал кнопок
        this.tabButtons.forEach((btn, i) => {
            btn.bg.setFillStyle(i === index ? 0x3a2810 : 0x2a1810);
        });

        this.activeTab = index;
    }
}
