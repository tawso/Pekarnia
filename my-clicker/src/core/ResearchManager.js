export class ResearchManager {

    constructor(state){

        this.state = state;

        this.researches = [

            {
                id:"dough",
                name:"Лучшее тесто",
                description:"+1 к клику",
                cost:500,
                purchased:false,
                apply:() => {

                    this.state.clickPower += 1;
                }
            },

            {
                id:"automation",
                name:"Автоматизация",
                description:"+25% дохода",
                cost:2500,
                purchased:false,
                apply:() => {

                    this.state.perSecond *= 1.25;
                }
            },

            {
                id:"marketing",
                name:"Реклама",
                description:"+50% дохода",
                cost:10000,
                purchased:false,
                apply:() => {

                    this.state.perSecond *= 1.5;
                }
            }
        ];
    }

    buy(id){

        const research =
            this.researches.find(
                x => x.id === id
            );

        if(!research)
            return false;

        if(research.purchased)
            return false;

        if(this.state.bread < research.cost)
            return false;

        this.state.bread -=
            research.cost;

        research.purchased = true;

        research.apply();

        return true;
    }

    serialize(){

        return this.researches.map(r => ({
            id:r.id,
            purchased:r.purchased
        }));
    }

    restore(data){

        if(!data)
            return;

        for(const saved of data){

            const research =
                this.researches.find(
                    r => r.id === saved.id
                );

            if(research){

                research.purchased =
                    saved.purchased;
            }
        }
    }
}