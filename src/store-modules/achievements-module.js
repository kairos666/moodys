import BadgesConfig from '@/config/badges';
import AchievementsServiceConfig from '@/config/achievements-service';
import Axios from 'axios';
import moment from 'moment';
import LSHelpers from '@/utils/local-storage-helpers';
import { cleanupBadgesObject, BadgesDifferer, formatBadgeSnackbarNotifications } from '@/utils/achievements-helpers';

// local storage achievements & basic badge data
let localyStoredAchievements = LSHelpers.getAchievements();
let defaultAchievements = {};
BadgesConfig.badgesArray.forEach(badgeData => {
    defaultAchievements[badgeData.title] = false;
});

/**
 * Execute Xhr request for achievements to moodys backend achievements service
 * @param {NotifObject} requestBody
 * @return {Promise}
 */
let pFireAchievements = function(requestBody) {
    let requestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    requestConfig.headers[AchievementsServiceConfig.apiServerKeyHeaderName] = AchievementsServiceConfig.apiServerKey;

    return Axios.post(
        AchievementsServiceConfig.serverURL + AchievementsServiceConfig.specialEventsEndpoint,
        requestBody,
        requestConfig
    );
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
            sessionAllPagesVisit: processPageVisitInitialConfig(BadgesConfig.technical.adventurerPageList),
            page404Visit: processPageVisitInitialConfig(BadgesConfig.technical.lostInTranslationPageList),
            isPagesVisitAchievementServiceCalled: false,
            isPage404AchievementServiceCalled: false,
            isBackToTheFutureAchievementServiceCalled: false,
            isFortunetellerAchievementServiceCalled: false,
            isDuckFaceAchievementServiceCalled: false,
            badgesStatus: Object.assign(defaultAchievements, localyStoredAchievements)
        },
        getters: {
            userBadges(state, getters, rootState) {
                // no authenticated user case (no data mood case)
                if (!rootState.auth.currentFirebaseUser) return [];
                // authenticated case
                let fullBadgesArray = BadgesConfig.badgesArray.map(badgeData => {
                    badgeData.achieved = state.badgesStatus[badgeData.title];
                    return badgeData;
                });

                return fullBadgesArray;
            }
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
            },
            updateAchievements(state, payload) {
                // cleanup counters before commiting
                let cleanPayload = cleanupBadgesObject(payload);
                state.badgesStatus = cleanPayload;
                LSHelpers.setAchievements(cleanPayload);
            }
        },
        actions: {
            updatePageVisit(context, payload) {
                // update page visit
                context.commit('updatePageVisit', payload);

                // trigger achievements update if eligible (call to backend micro-service)
                if (!context.state.isPagesVisitAchievementServiceCalled && context.state.sessionAllPagesVisit.every(pageVisitItem => pageVisitItem.isVisited)) {
                    context.dispatch('updateAchievements', BadgesConfig.technical.adventurerID);
                }
                if (!context.state.isPage404AchievementServiceCalled && context.state.page404Visit.every(pageVisitItem => pageVisitItem.isVisited)) {
                    context.dispatch('updateAchievements', BadgesConfig.technical.lostInTranslationID);
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
                }

                // has traveled more than one month in the future
                if (!context.state.isFortunetellerAchievementServiceCalled && isFarInTheFuture) {
                    context.dispatch('updateAchievements', BadgesConfig.technical.fortunetellerID);
                }
            },
            updateForgotPassword(context, payload) {
                pFireAchievements({ achievementID: BadgesConfig.technical.alzeihmerGoldfishID, updateType: 'counter', originUID: payload }).catch(() => {
                    console.warn('achievements update failed');
                });
            },
            updatedMood(context) {
                pFireAchievements({ achievementID: BadgesConfig.technical.moodsRelatedAchievementsSpecialEvt, updateType: 'calculation', originUID: context.rootState.auth.currentFirebaseUser.uid }).catch(() => {
                    console.warn('achievements update failed');
                });
            },
            updateCustomAvatarAchievement(context) {
                // check for custom avatar in cache storage
                if (CacheStorage && caches && !context.state.isDuckFaceAchievementServiceCalled) {
                    const currentUser = context.rootGetters.usersArray.filter(user => user.isCurrentUser);
                    const avatarURL = (currentUser !== undefined && currentUser.length === 1) ? currentUser[0].avatar : undefined;
                    const pGetCacheFunc = function() { return caches.open(BadgesConfig.technical.gravatarImagesCacheName) };
                    const pGetMatchingAvatar = function(cache) { return cache.match(avatarURL) };
                    const pMatchCheck = function(matchingReq) {
                        if (matchingReq !== undefined) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject();
                        }
                    };

                    // check if there is a matching cache entry
                    if (avatarURL) {
                        pGetCacheFunc().then(pGetMatchingAvatar).then(pMatchCheck).then(() => {
                            // custom avatar match found
                            pFireAchievements({ achievementID: BadgesConfig.technical.duckFaceID, updateType: 'behavior', originUID: context.rootState.auth.currentFirebaseUser.uid }).then(() => {
                                context.commit('achievementServiceCalled', 'isDuckFaceAchievementServiceCalled');
                            }).catch(() => {
                                console.warn('achievements update failed');
                            });
                        }).catch(() => {
                            // no custom avatar found (nothing to do)
                        });
                    }
                }
            },
            updateAchievements(context, payload) {
                // update achievements from UI to backend
                pFireAchievements({ achievementID: payload, updateType: 'behavior', originUID: context.rootState.auth.currentFirebaseUser.uid }).then(() => {
                    // register achievement call
                    let serviceCallProperty;
                    switch (payload) {
                    case BadgesConfig.technical.backToTheFutureID: serviceCallProperty = 'isBackToTheFutureAchievementServiceCalled'; break;
                    case BadgesConfig.technical.fortunetellerID: serviceCallProperty = 'isFortunetellerAchievementServiceCalled'; break;
                    case BadgesConfig.technical.lostInTranslationID: serviceCallProperty = 'isPage404AchievementServiceCalled'; break;
                    case BadgesConfig.technical.adventurerID: serviceCallProperty = 'isPagesVisitAchievementServiceCalled'; break;
                    }
                    if (serviceCallProperty) context.commit('achievementServiceCalled', serviceCallProperty);
                }).catch(() => {
                    console.warn('achievements update failed');
                });
            },
            updateAchievementsInUI(context, payload) {
                // update achievements from backend to UI
                // 1. find newly achieved badges to notify
                let newlyAchievedBadges = formatBadgeSnackbarNotifications(BadgesDifferer(context.state.badgesStatus, payload));
                newlyAchievedBadges.forEach(newBadgeData => {
                    context.dispatch('notify', { subType: 'badgeUpdate', options: newBadgeData }, { root: true });
                });
                // 2. update model
                context.commit('updateAchievements', payload);
            }
        }
    };
};

export default {
    achievementsStore: AchievementsModule
};
