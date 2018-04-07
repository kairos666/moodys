class AchievementEvt {
    constructor(subType, payload) {
        this.type = 'achievements';
        this.subType = subType;
        this.payload = payload;
    }
};

/**
 * generate PageVisitEvt
 * @param {string}
 * @returns {AchievementEvt}
 */
export class PageVisitEvt extends AchievementEvt {
    constructor(pageName) {
        super('page-visited', pageName);
    }
};

/**
 * generate ForgotPasswordEvt
 * @param {String} targetEmail
 * @returns {AchievementEvt}
 */
export class ForgotPasswordEvt extends AchievementEvt {
    constructor(targetEmail) {
        super('forgot-password', targetEmail);
    }
};

/**
 * generate ForgotPasswordEvt
 * @returns {AchievementEvt}
 */
export class MoodRegisteredEvt extends AchievementEvt {
    constructor() {
        super('mood-registered');
    }
};

/**
 * generate TimeTravelEvt
 * @param {Object} targetRange
 * @returns {AchievementEvt}
 */
export class TimeTravelEvt extends AchievementEvt {
    constructor(targetRange) {
        super('time-travel', targetRange);
    }
};

// TODO
// clickedOnNotification from SW - just after action [fast hand, tchin tchin, chain reaction]
// ensure all ui event are processed - OK [mood entry, page visits, past, future, forgot password] await TEST [duck face] KO [duck face]
// snackbar for achievements + animation

const badgesConfig = {
    badgesArray: [
        { title: 'adventurer', description: 'visited all pages in one session', badge: 'adventurer' },
        { title: 'lost in translation', description: 'went to 404 page', badge: 'lost-in-translation' },
        { title: 'duck face', description: 'got a custom avatar', badge: 'no-more-faceless' },
        { title: 'goldfish', description: 'forgot password mechanism activated X1', badge: 'goldfish' },
        { title: 'alzeihmer', description: 'forgot password mechanism activated X3', badge: '019-grandfather' },
        { title: 'mood alert', description: 'subscribed for notifications', badge: '003-smartphone' },
        { title: 'mood monitor', description: 'multiple subscriptions for notifications', badge: '010-technology' },
        { title: 'fast hand', description: 'clicked on notification', badge: 'fast-hand' },
        { title: 'tchin tchin', description: 'your mood update notification nudged someone else mood update', badge: '001-toast' },
        { title: 'chain reaction', description: 'your mood update notification nudged two persons to update their mood', badge: '007-share' },
        { title: 'back to the future', description: 'time traveled more than one month in the past', badge: 'back-to-the-future' },
        { title: 'fortuneteller', description: 'tried to time travel more than a month in the future. Tip: it is useless!', badge: '010-crystal-ball' },
        { title: 'noob moodist', description: 'first mood update', badge: '014-helmet' },
        { title: 'baron moodist', description: 'updated mood three days straight', badge: '011-crown-2' },
        { title: 'duke moodist', description: 'updated mood a full week straight', badge: '012-crown-1' },
        { title: 'archduke moodist', description: 'updated mood a full month straight', badge: '010-crown-3' },
        { title: 'king moodist', description: 'updated mood three months straight', badge: '013-crown' },
        { title: 'emperor moodist', description: 'updated mood a full year straight', badge: '003-greek' },
        { title: 'happy days', description: 'positive mood for the last five updates', badge: '005-heavy-metal' },
        { title: 'depression', description: 'negative mood for the last five updates', badge: '006-crying' },
        { title: 'zen & balanced', description: 'neurtral mood for the last three updates', badge: '003-libra' },
        { title: 'mood roller coaster', description: 'changed mood from positive to negative, or reverse, in one day', badge: '005-roller-coaster' },
        { title: 'mood swings meds', description: 'changed mood more than three times a day', badge: '008-pills' },
        { title: 'blissed', description: 'mood updated to highest possible score', badge: '004-island' },
        { title: 'suicidal tendencies', description: 'mood updated to lowest possible score', badge: '006-gallows' },
        { title: 'come back', description: 'from negative to positive mood', badge: '005-profits' },
        { title: 'mood swing', description: 'from positive to negative mood', badge: '004-loss' },
        { title: 'stairway to heaven', description: 'mood increased 5 scores at once', badge: '015-paper-plane' },
        { title: 'nuclear disaster', description: 'mood decreased 5 scores at once', badge: '007-bomb-detonation' }
    ],
    AchievementsEvts: {
        PageVisitEvt: PageVisitEvt,
        ForgotPasswordEvt: ForgotPasswordEvt,
        TimeTravelEvt: TimeTravelEvt,
        MoodRegisteredEvt: MoodRegisteredEvt
    },
    technical: {
        gravatarImagesCacheName: '$$$toolbox-cache$$$https://moodies-1ad4f.firebaseapp.com/$$$',
        adventurerPageList: ['home', 'profile', 'users', 'mood-input', 'time-travel', 'about', 'badges'],
        adventurerID: 'adventurer',
        lostInTranslationPageList: ['404'],
        lostInTranslationID: 'lost in translation',
        backToTheFutureID: 'back to the future',
        fortunetellerID: 'fortuneteller',
        alzeihmerGoldfishID: 'forgotPasswordCounter',
        duckFaceID: 'duck face',
        moodsRelatedAchievementsSpecialEvt: 'all-moods-related-achievements'
    }
};

export default badgesConfig;
