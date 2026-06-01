export class QuestManager {

    constructor(state){

        this.state = state;

        this.quests = [

            {
                id:"quest1",
                title:"Испечь 100 хлеба",
                target:100,
                reward:50,
                completed:false,
                type:"bread"
            },

            {
                id:"quest2",
                title:"Испечь 1000 хлеба",
                target:1000,
                reward:500,
                completed:false,
                type:"bread"
            },

            {
                id:"quest3",
                title:"Сделать 250 кликов",
                target:250,
                reward:300,
                completed:false,
                type:"clicks"
            },

            {
                id:"quest4",
                title:"Достичь 5 уровня",
                target:5,
                reward:1000,
                completed:false,
                type:"level"
            }
        ];
    }

    update(){

        for(const quest of this.quests){

            if(quest.completed)
                continue;

            let value = 0;

            switch(quest.type){

                case "bread":
                    value =
                        this.state.totalBread;
                    break;

                case "clicks":
                    value =
                        this.state.clicks;
                    break;

                case "level":
                    value =
                        this.state.level;
                    break;
            }

            if(value >= quest.target){

                quest.completed = true;

                this.state.bread +=
                    quest.reward;
            }
        }
    }

    serialize(){

        return this.quests.map(q => ({
            id:q.id,
            completed:q.completed
        }));
    }

    restore(data){

        if(!data)
            return;

        for(const saved of data){

            const quest =
                this.quests.find(
                    q => q.id === saved.id
                );

            if(quest){

                quest.completed =
                    saved.completed;
            }
        }
    }
}