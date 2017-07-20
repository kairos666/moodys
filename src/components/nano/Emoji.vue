<template>
    <img :width="this.currentSize" :height="this.currentSize" :src="this.moodToSvg.src" :alt="this.moodToSvg.alt">
</template>

<script>
    import moodConfig from '@/config/moods';

    export default {
        props: ['mood', 'size'],
        computed: {
            moodToSvg() {
                let emoFileName;
                let emoAlt = 'current mood - ';

                let moodArrayIndex = moodConfig.moodIndexes.indexOf(this.mood);
                emoFileName = moodConfig.moodImages[moodArrayIndex];
                emoAlt += moodConfig.moodLabels[moodArrayIndex];

                return {
                    src: '/static/img/smileys/' + emoFileName,
                    alt: emoAlt
                };
            },
            currentSize() {
                // optional prop, 60 if undefined
                return (this.size) ? this.size : 60;
            }
        }
    };
</script>

<style scoped>
    
</style>
