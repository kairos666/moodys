<template>
    <figure class="mood-figure">
        <emoji :mood="medianMood"></emoji>
        <figcaption>{{moodLabel}}</figcaption>
    </figure>
</template>

<script>
    import emojiHelpers from '@/utils/emoji-helpers';
    import Emoji from '@/components/nano/Emoji';

    export default {
        data() {
            return {
                medianMood: '3'
            };
        },
        computed: {
            moodLabel() {
                return emojiHelpers.emojiData(this.medianMood).label;
            }
        },
        components: {
            emoji: Emoji
        }
    };
</script>

<style scoped lang="scss">
    
</style>
