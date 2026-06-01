export class GameState {

    constructor(){

        this.bread = 0;

        this.totalBread = 0;

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

    update(delta){

        const gain =
            this.perSecond *
            delta;

        this.bread += gain;

        this.totalBread += gain;
    }
}