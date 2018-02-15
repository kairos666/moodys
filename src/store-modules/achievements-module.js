import BadgesConfig from '@/config/badges';
import { EventBus } from '@/utils/events-bus';

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

// listen to achievements events and react accordingly
EventBus.$on('achievements', (evt) => {
    console.log('captured achievement event', evt.subType, evt.payload);
});

let AchievementsModule = database => {
    return {
        namespaced: true,
        state: processBadgesConfig(BadgesConfig.badgesArray)
    };
};

export default {
    achievementsStore: AchievementsModule
};
