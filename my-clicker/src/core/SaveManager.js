export class SaveManager {

    static save(state){

        const data = {

            bread:state.bread,
            totalBread:state.totalBread,

            clickPower:state.clickPower,

            perSecond:state.perSecond,

            level:state.level,

            exp:state.exp,

            clicks:state.clicks,

            prestigePoints:
                state.prestigePoints,

            prestigeMultiplier:
                state.prestigeMultiplier,

            upgrades:
                state.upgrades,

            lastOnline:
                Date.now()
        };

        localStorage.setItem(
            "bakery_v5",
            JSON.stringify(data)
        );
    }

    static load(state){

        const raw =
            localStorage.getItem(
                "bakery_v5"
            );

        if(!raw)
            return;

        const data =
            JSON.parse(raw);

        Object.assign(
            state,
            data
        );
    }
}