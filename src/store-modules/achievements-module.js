import BadgesConfig from '@/config/badges';

/**
 * For each possible badges, provides a boolean for achived or not
 * @param {Array} badgesArray
 * @return {Array} badgesStatuses
 */
let processBadgesConfig = function(badgesArray) {
    return badgesArray.map(badgeConf => {
        // random achievements - TODO retrieve real value from db, default to false
        badgeConf.achieved = Math.random() >= 0.5;

        return badgeConf;
    });
};

let AchievementsModule = database => {
    return {
        namespaced: true,
        state: processBadgesConfig(BadgesConfig.badgesArray)
    };
};

export default {
    achievementsStore: AchievementsModule
};
