import BadgesConfig from '@/config/badges';
import moment from 'moment';

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
            page404Visit: processPageVisitInitialConfig(BadgesConfig.technical.lostInTranslationPageList),
            isPagesVisitAchievementServiceCalled: false,
            isPage404AchievementServiceCalled: false,
            isBackToTheFutureAchievementServiceCalled: false,
            isFortunetellerAchievementServiceCalled: false
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
            achievementServiceCalled(state, payload) {
                state[payload] = true;
            }
        },
        actions: {
            updatePageVisit(context, payload) {
                // update page visit
                context.commit('updatePageVisit', payload);

                // trigger achievements update if eligible (call to backend micro-service)
                if (!context.state.isPagesVisitAchievementServiceCalled && context.state.sessionAllPagesVisit.every(pageVisitItem => pageVisitItem.isVisited)) {
                    context.dispatch('updateAchievements', BadgesConfig.technical.adventurerID);
                    context.commit('achievementServiceCalled', 'isPagesVisitAchievementServiceCalled');
                }
                if (!context.state.isPage404AchievementServiceCalled && context.state.page404Visit.every(pageVisitItem => pageVisitItem.isVisited)) {
                    context.dispatch('updateAchievements', BadgesConfig.technical.lostInTranslationID);
                    context.commit('achievementServiceCalled', 'isPage404AchievementServiceCalled');
                }
            },
            updateTimeTravel(context, payload) {
                const inOneMonth = moment().add(1, 'months');
                const oneMonthAgo = moment().subtract(1, 'months');
                const isFarInTheFuture = moment(payload[1]).isAfter(inOneMonth);
                const isFarInThePast = moment(payload[0]).isBefore(oneMonthAgo);

                // has traveled more than one month in the past
                if (!context.state.isBackToTheFutureAchievementServiceCalled && isFarInThePast) {
                    context.dispatch('updateAchievements', BadgesConfig.technical.backToTheFutureID);
                    context.commit('achievementServiceCalled', 'isBackToTheFutureAchievementServiceCalled');
                }

                // has traveled more than one month in the future
                if (!context.state.isFortunetellerAchievementServiceCalled && isFarInTheFuture) {
                    context.dispatch('updateAchievements', BadgesConfig.technical.fortunetellerID);
                    context.commit('achievementServiceCalled', 'isFortunetellerAchievementServiceCalled');
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
