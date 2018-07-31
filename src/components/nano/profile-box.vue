<template>
    <div class="profile-box">
        <figure v-if="mood" class="mood-figure">
            <emoji size="50" :mood="mood"></emoji>
            <figcaption>{{emojiLabel}}</figcaption>
        </figure>
        <figure class="profile-figure">
            <img width="50" class="avatar" :src="user.avatar" :alt="('avatar de ' + user.firstname + ' ' + user.lastname)" >
            <figcaption>
                <span class="name">{{user.firstname}} {{user.lastname}}</span>
                <span class="motto">{{user.motto}}</span>
            </figcaption>
        </figure>
    </div>
</template>

<script>
    import Emoji from '@/components/nano/Emoji';
    import emojiHelpers from '@/utils/emoji-helpers';

    export default {
        props: ['user', 'mood'],
        computed: {
            emojiLabel: function() {
                let relatedEmojiData = emojiHelpers.emojiData(this.mood);
                return (this.mood && relatedEmojiData) ? emojiHelpers.emojiData(this.mood).label : '';
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

    .profile-figure { margin:0; overflow:hidden;
        img { float:left; border-radius:25%; margin-right:16px; }
        figcaption { overflow:hidden;
            span { display:block; }
            .name { font-size:px2rem(16); line-height:px2rem(21); color:rgba(0,0,0,.87); }
            .motto { font-size:px2rem(14); line-height:px2rem(18); color:rgba(0,0,0,.54); }
        }
    }
    .mood-figure { margin:0 0 0 1rem; float:right; }
</style>
