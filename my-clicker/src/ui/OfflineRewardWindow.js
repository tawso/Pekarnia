export class OfflineRewardWindow {
    constructor(scene, amount) {
        this.scene = scene;
        this.amount = amount;
    }

    show() {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Фон затемнения
        const overlay = this.scene.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x000000,
            0.7
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setInteractive();

        // Контейнер окна
        const containerX = width / 2;
        const containerY = height / 2;
        const containerWidth = Math.min(300, width - 40);
        const containerHeight = 200;

        const bg = this.scene.add.rectangle(
            containerX,
            containerY,
            containerWidth,
            containerHeight,
            0x1a0f08
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setStrokeStyle(3, 0xffd700);

        // Заголовок
        const title = this.scene.add.text(
            containerX,
            containerY - 60,
            '💰 ОФФЛАЙН ДОХОД',
            { fontSize: '24px', fill: '#ffd700', fontStyle: 'bold', align: 'center' }
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0);

        // Количество хлеба
        const amountText = this.scene.add.text(
            containerX,
            containerY,
            `+${this.formatNumber(this.amount)} 🍞`,
            { fontSize: '32px', fill: '#ffff00', fontStyle: 'bold', align: 'center' }
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0);

        // Кнопка ОК
        const btnX = containerX;
        const btnY = containerY + 60;
        const btnWidth = 100;
        const btnHeight = 40;

        const btnBg = this.scene.add.rectangle(
            btnX,
            btnY,
            btnWidth,
            btnHeight,
            0x2a5a2a
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setInteractive({ useHandCursor: true });

        const btnText = this.scene.add.text(
            btnX,
            btnY,
            'Получить!',
            { fontSize: '14px', fill: '#ffffff', fontStyle: 'bold' }
        ).setOrigin(0.5, 0.5).setScrollFactor(0, 0);

        btnBg.on('pointerover', () => btnBg.setFillStyle(0x3a7a3a));
        btnBg.on('pointerout', () => btnBg.setFillStyle(0x2a5a2a));

        const closeWindow = () => {
            overlay.destroy();
            bg.destroy();
            title.destroy();
            amountText.destroy();
            btnBg.destroy();
            btnText.destroy();
        };

        btnBg.on('pointerdown', () => {
            // Анимация получения
            this.scene.tweens.add({
                targets: amountText,
                y: amountText.y - 50,
                alpha: 0,
                duration: 500,
                onComplete: () => closeWindow()
            });
        });

        overlay.on('pointerdown', () => closeWindow());

        // Анимация появления
        title.setAlpha(0);
        amountText.setAlpha(0);
        this.scene.tweens.add({
            targets: [title, amountText],
            alpha: 1,
            duration: 300
        });
    }

    formatNumber(num) {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return Math.floor(num).toString();
    }
}
