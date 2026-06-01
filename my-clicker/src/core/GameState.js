export class GameState {

    constructor(){

        this.bread = 0;

        this.totalBread = 0;

        this.goldenBread = 0;

        this.totalGoldenBread = 0;

        this.clickPower = 1;

        this.perSecond = 0;

        this.level = 1;

        this.exp = 0;

        this.clicks = 0;

        this.prestigePoints = 0;

        this.prestigeMultiplier = 1;

        this.offlineEarned = 0;

        this.upgrades = [

            {
                id:"helper",
                name:"Помощник",
                icon:"👨‍🍳",
                cost:10,
                owned:0,
                bps:1
            },

            {
                id:"oven",
                name:"Печь",
                icon:"🔥",
                cost:100,
                owned:0,
                bps:5
            },

            {
                id:"shop",
                name:"Пекарня",
                icon:"🏪",
                cost:1000,
                owned:0,
                bps:25
            },

            {
                id:"factory",
                name:"Завод",
                icon:"🏭",
                cost:10000,
                owned:0,
                bps:100
            }
        ];
    }

    click(){

        this.bread += this.clickPower;

        this.totalBread += this.clickPower;

        this.clicks++;

        this.addExp(1);

        // 5% шанс получить золотой хлеб
        if (Math.random() < 0.05) {
            this.goldenBread += 1;
            this.totalGoldenBread += 1;
        }
    }

    addExp(value){

        this.exp += value;

        const need = this.level * 100;

        if(this.exp >= need){

            this.exp -= need;

            this.level++;

            this.clickPower += 1;
        }
    }

    buyUpgrade(id){

        const upgrade =
            this.upgrades.find(x=>x.id===id);

        if(!upgrade)
            return false;

        if(this.bread < upgrade.cost)
            return false;

        this.bread -= upgrade.cost;

        upgrade.owned++;

        upgrade.cost =
            Math.floor(upgrade.cost * 1.15);

        this.recalculate();

        return true;
    }

    recalculate(){

        let income = 0;

        for(const u of this.upgrades){

            income +=
                u.owned * u.bps;
        }

        this.perSecond =
            income *
            this.prestigeMultiplier;
    }

    addOfflineIncome(amount) {
        this.bread += amount;
        this.totalBread += amount;
        this.offlineEarned += amount;
    }

    doPrestige() {
        const prestigeGain = Math.floor(Math.sqrt(this.totalBread / 1e6));
        this.prestigePoints += prestigeGain;
        this.prestigeMultiplier += prestigeGain * 0.1;
        
        // Золотой хлеб увеличивает множитель на 0.5% за каждый
        this.prestigeMultiplier += (this.totalGoldenBread * 0.005);
        
        // Сброс
        this.bread = 0;
        this.upgrades.forEach(u => {
            u.owned = 0;
            u.cost = u.baseCost || 10 * Math.pow(10, this.upgrades.indexOf(u));
        });
        this.level = 1;
        this.exp = 0;
        this.clicks = 0;
        this.perSecond = 0;
        this.recalculate();
    }

    update(delta){

        const gain =
            this.perSecond *
            delta;

        this.bread += gain;

        this.totalBread += gain;
    }
}