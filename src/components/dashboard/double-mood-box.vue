<template>
    <div class="double-mood-box">
        <section>
            <h3>{{titleLeft}}</h3>
            <figure class="mood-figure aligned-right">
                <emoji :mood="moodLeft"></emoji>
                <figcaption>{{emojiLabel(moodLeft)}}</figcaption>
            </figure>
        </section>
        <section>
            <h3>{{titleRight}}</h3>
            <figure class="mood-figure aligned-left">
                <emoji :mood="moodRight"></emoji>
                <figcaption>{{emojiLabel(moodRight)}}</figcaption>
            </figure>
        </section>
    </div>
</template>

<script>
    import Emoji from '@/components/nano/Emoji';
    import emojiHelpers from '@/utils/emoji-helpers';

    export default {
        props: ['moodLeft', 'titleLeft', 'moodRight', 'titleRight'],
        methods: {
            emojiLabel: function(mood) {
                let relatedEmojiData = emojiHelpers.emojiData(mood);
                return (mood && relatedEmojiData) ? emojiHelpers.emojiData(mood).label : '';
            }
        },
        components: {
            'emoji': Emoji
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';
    
    h3 { font-size:px2rem(24); line-height:px2rem(21); font-weight:300; color:#000; margin:0; padding-bottom:px2rem(32); }
    .double-mood-box { display:flex;
        > * { flex:1 0 50%; box-sizing:border-box; min-height:($home-cards-min-height - 32);
            &:first-child { padding-right:(2*$gutter-base - 1px); border-right:1px solid rgba(0, 0, 0, .5); text-align:right; }
            &:last-child { padding-left:2*$gutter-base; }
        }
    }
    .mood-figure { margin:0; }
</style>
