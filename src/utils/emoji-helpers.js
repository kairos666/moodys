import moodConfig from '@/config/moods';

class EmojiObj {
    constructor(index, label, image, iconFont) {
        this.index = index;
        this.label = label;
        this.image = image;
        this.iconFont = iconFont;
    }
}

/* process config and store data */
let EmojiDataArrayBuilder = function(moodConfig) {
    return moodConfig.moodIndexes.map((item, index) => new EmojiObj(item, moodConfig.moodLabels[index], moodConfig.moodImages[index], moodConfig.moodFontCharacter[index]));
};
const emojiDataArray = EmojiDataArrayBuilder(moodConfig);

/**
 * provide matching emoji data according to index
 */
let emojiData = function(moodValue) {
    return emojiDataArray.find(item => (item.index === moodValue));
};

export default {
    emojiDataArray: emojiDataArray,
    emojiData: emojiData
};
