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

/**
 * For each possible page to visit a boolean for visited or not during this session
 * @param {Array} PageList
 * @return {Array}
 */
let processPageVisitInitialConfig = function(pageList) {
    return pageList.map(pageName => {
        return { pageName, isVisited: false };
    });
};

let AchievementsModule = database => {
    return {
        namespaced: true,
        state: {
            userAchievements: processBadgesConfig(BadgesConfig.badgesArray),
            sessionAllPagesVisit: processPageVisitInitialConfig(BadgesConfig.technical.adventurerPageList),
            isPagesVisitAchievementServiceCalled: false,
            page404Visit: processPageVisitInitialConfig(BadgesConfig.technical.lostInTranslationPageList),
            isPage404AchievementServiceCalled: false
        },
        mutations: {
            updatePageVisit(state, pageName) {
                // update sessionAllPagesVisit
                let relevantSessionPageVisit = state.sessionAllPagesVisit.find(item => (pageName === item.pageName));
                if (relevantSessionPageVisit) relevantSessionPageVisit.isVisited = true;

                // update page404Visit
                let relevant404PageVisit = state.page404Visit.find(item => (pageName === item.pageName));
                if (relevant404PageVisit) relevant404PageVisit.isVisited = true;
            },
            pagesVisitAchievementServiceCalled(state) {
                state.isPagesVisitAchievementServiceCalled = true;
            },
            page404AchievementServiceCalled(state) {
                state.isPage404AchievementServiceCalled = true;
            }
        },
        actions: {
            updatePageVisit(context, payload) {
                // update page visit
                context.commit('updatePageVisit', payload);

                // trigger achievements update if eligible (call to backend micro-service)
                if (!context.state.isPagesVisitAchievementServiceCalled && context.state.sessionAllPagesVisit.every(pageVisitItem => pageVisitItem.isVisited)) {
                    context.dispatch('updateAchievements', BadgesConfig.technical.adventurerID);
                    context.commit('pagesVisitAchievementServiceCalled');
                }
                if (!context.state.isPage404AchievementServiceCalled && context.state.page404Visit.every(pageVisitItem => pageVisitItem.isVisited)) {
                    context.dispatch('updateAchievements', BadgesConfig.technical.lostInTranslationID);
                    context.commit('page404AchievementServiceCalled');
                }
            },
            updateAchievements(context, payload) {
                console.log('TODO, ajax call to achievements service with: ' + payload);
            }
        }
    };
};

export default {
    achievementsStore: AchievementsModule
};
