import emojiHelpers from '@/utils/emoji-helpers';

class CompletionObject {
    constructor(completionRate, respondentNb, totalUserNb) {
        this.completionRate = completionRate;
        this.respondentNb = respondentNb;
        this.totalUserNb = totalUserNb;
    }
}

let statsModule = {
    getters: {
        averageMoodObject(state, getters) {
            // today's user moods sorted by value (without holiday|sick|null values)
            let sortedArray = getters.usersArray
                .filter(item => (item.currentMood !== null && item.currentMood !== 'sick' && item.currentMood !== 'holiday'))
                .map(item => parseInt(item.currentMood))
                .sort();

            let averageCalculator = function(src) {
                // early stopping if no data
                if (src.length === 0) return null;

                let moodLength = src.length;
                return Math.round(src.reduce((a, b) => a + b, 0) / moodLength);
            };
            let average = averageCalculator(sortedArray);
            let result = (average !== null) ? emojiHelpers.emojiData(average.toString()) : emojiHelpers.emojiData(average);

            return result;
        },
        todayCompletionObject(state, getters, rootState) {
            // total nb of users
            let totalUsers = getters.usersArray.length;
            // total nb of today's respondents
            let respondentUsers = Object.keys(rootState.daysmoods).length;
            let completionRate = Math.round((respondentUsers / totalUsers) * 100);

            return new CompletionObject(completionRate, respondentUsers, totalUsers);
        }
    }
};

export default statsModule;
