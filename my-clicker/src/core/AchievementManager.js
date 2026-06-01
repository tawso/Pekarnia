export class AchievementManager {

    constructor(state){

        this.state = state;

        this.achievements = [

            {
                id:"first_click",
                name:"Первый хлеб",
                icon:"🍞",
                description:"Испеки первый хлеб",
                unlocked:false,
                condition:() =>
                    this.state.totalBread >= 1
            },

            {
                id:"bread_100",
                name:"Пекарь",
                icon:"🥖",
                description:"Получить 100 хлеба",
                unlocked:false,
                condition:() =>
                    this.state.totalBread >= 100
            },

            {
                id:"bread_1000",
                name:"Мастер теста",
                icon:"👨‍🍳",
                description:"Получить 1000 хлеба",
                unlocked:false,
                condition:() =>
                    this.state.totalBread >= 1000
            },

            {
                id:"bread_10000",
                name:"Хлебный магнат",
                icon:"🏭",
                description:"Получить 10000 хлеба",
                unlocked:false,
                condition:() =>
                    this.state.totalBread >= 10000
            },

            {
                id:"clicks_100",
                name:"Кликер",
                icon:"🖱",
                description:"Сделать 100 кликов",
                unlocked:false,
                condition:() =>
                    this.state.clicks >= 100
            },

            {
                id:"clicks_1000",
                name:"Маньяк",
                icon:"⚡",
                description:"Сделать 1000 кликов",
                unlocked:false,
                condition:() =>
                    this.state.clicks >= 1000
            },

            {
                id:"level_10",
                name:"Опытный",
                icon:"⭐",
                description:"Достичь 10 уровня",
                unlocked:false,
                condition:() =>
                    this.state.level >= 10
            },

            {
                id:"level_25",
                name:"Легенда",
                icon:"🌟",
                description:"Достичь 25 уровня",
                unlocked:false,
                condition:() =>
                    this.state.level >= 25
            }
        ];
    }

    check(){

        const unlocked = [];

        for(const achievement of this.achievements){

            if(achievement.unlocked)
                continue;

            if(achievement.condition()){

                achievement.unlocked = true;

                unlocked.push(achievement);
            }
        }

        return unlocked;
    }

    getUnlockedCount(){

        return this.achievements.filter(
            x => x.unlocked
        ).length;
    }

    serialize(){

        return this.achievements.map(a => ({
            id:a.id,
            unlocked:a.unlocked
        }));
    }

    restore(data){

        if(!data)
            return;

        for(const saved of data){

            const achievement =
                this.achievements.find(
                    a => a.id === saved.id
                );

            if(achievement){

                achievement.unlocked =
                    saved.unlocked;
            }
        }
    }
}