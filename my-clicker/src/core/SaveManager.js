export class SaveManager {

    static save(gameState, achievements = null, quests = null, researches = null){

        const data = {
            bread: gameState.bread,
            totalBread: gameState.totalBread,
            goldenBread: gameState.goldenBread,
            totalGoldenBread: gameState.totalGoldenBread,
            clickPower: gameState.clickPower,
            perSecond: gameState.perSecond,
            level: gameState.level,
            exp: gameState.exp,
            clicks: gameState.clicks,
            prestigePoints: gameState.prestigePoints,
            prestigeMultiplier: gameState.prestigeMultiplier,
            upgrades: gameState.upgrades,
            offlineEarned: gameState.offlineEarned,
            lastOnline: Date.now(),
            achievements: achievements,
            quests: quests,
            researches: researches
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
            return null;

        const data =
            JSON.parse(raw);

        Object.assign(
            state,
            data
        );

        return data;
    }

    static calculateOfflineEarnings(gameState) {
        const data = JSON.parse(localStorage.getItem("bakery_v5"));
        if (!data || !data.lastOnline) return 0;

        const now = Date.now();
        const offlineTime = (now - data.lastOnline) / 1000; // в секундах
        const pps = data.upgrades.reduce((sum, u) => sum + (u.owned * u.bps), 0);
        const earnings = Math.floor(pps * offlineTime * data.prestigeMultiplier);
        
        return earnings;
    }
}