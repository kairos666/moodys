<template>
    <article class="post" :class="{ 'post-single': single }">
        <p>{{postData.body}}</p>
        <aside class="post__meta">
            <figure>
                <img class="avatar" :src="user.avatar" :alt="('avatar de ' + user.firstname + ' ' + user.lastname)" >
                <emoji v-if="(this.postData.meta.linkedMoodIndex !== 'none')" :mood="emoji.index" size="24"></emoji>
            </figure>
            <time :datetime="dateTime">{{time}}</time>
        </aside>
    </article>
</template>

<script>
    import Post from '@/store-modules/posts-module';
    import Emoji from '@/components/nano/Emoji';
    import emojiHelpers from '@/utils/emoji-helpers';
    import moment from 'moment';

    export default {
        props: {
            postData: Post,
            single: Boolean
        },
        data() {
            return {
                recalculateTimeInterval: undefined,
                recalculateTimeDelay: 60 * 1000,
                time: this.calculateElapsedTime(this.postData.meta.timestamp),
                dateTime: this.formatedTime(this.postData.meta.timestamp)
            };
        },
        computed: {
            emoji() {
                if (this.postData.meta.linkedMoodIndex === 'none') {
                    return emojiHelpers.emojiData(null);
                } else {
                    return emojiHelpers.emojiData(this.postData.meta.linkedMoodIndex);
                }
            },
            user() {
                return this.$store.getters.usersArray.find(user => (user.id === this.postData.meta.user));
            }
        },
        mounted() {
            // re evaluate time elapsed from post every minute
            this.recalculateTimeInterval = setInterval(() => {
                this.time = this.calculateElapsedTime(this.postData.meta.timestamp);
            }, this.recalculateTimeDelay);
        },
        destroyed() {
            // clear post interval for recalculating time elapsed
            clearInterval(this.recalculateTimeInterval);
        },
        methods: {
            calculateElapsedTime(timestamp) {
                return moment(timestamp).fromNow();
            },
            formatedTime(timestamp) {
                return moment(timestamp).format('YYYY-MM-DDTHH:mm:ss');
            }
        },
        components: {
            emoji: Emoji
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_utils.scss';
    @import '../../styles/_variables.scss';
    @import '../../styles/nano/_posts.scss';
</style>
