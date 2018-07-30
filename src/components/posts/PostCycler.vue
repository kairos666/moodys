<template>
    <transition name="fade" mode="out-in" 
        :enter-class="`fade-${(isNewToOld) ? 'older' : 'newer'}-enter`" 
        :enter-to-class="`fade-${(isNewToOld) ? 'older' : 'newer'}-enter-to`" 
        :leave-class="`fade-${(isNewToOld) ? 'newer' : 'older'}-leave`" 
        :leave-to-class="`fade-${(isNewToOld) ? 'newer' : 'older'}-leave-to`">
        <post key="original" v-if="!isDoppelganger && posts.length !== 0" single :post-data="posts[index]"></post>
        <post key="doppler" v-else-if="isDoppelganger && posts.length !== 0" single :post-data="posts[index]"></post>
        <p key="empty" v-else>There are no twoots yet.</p>
    </transition>
</template>

<script>
    import Post from '@/components/posts/Post';

    export default {
        props: {
            index: {
                type: Number,
                default: 0
            },
            posts: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                isDoppelganger: false,
                isNewToOld: true
            };
        },
        watch: {
            index: function(newPostIndex, formerPostIndex) {
                // cycle between post display component for animation
                this.isDoppelganger = !this.isDoppelganger;

                // determine if entering post is newer than leaving post (change transition direction, based on index only therefore rely on posts array being sorted)
                this.isNewToOld = (newPostIndex > formerPostIndex);
            }
        },
        components: {
            Post
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    .fade-enter-active, .fade-leave-active { transition: all .5s ease; }
    /* from newer post to older */
    .fade-newer-leave { opacity: 1; transform: translateY(0%); }
    .fade-newer-leave-to { opacity: 0; transform: translateY(-100%); }
    .fade-older-enter { opacity: 0; transform: translateY(100%); }
    .fade-older-enter-to { opacity: 1; transform: translateY(0%); }
    /* from older post to newest */
    .fade-older-leave { opacity: 1; transform: translateY(0%); }
    .fade-older-leave-to { opacity: 0; transform: translateY(100%); }
    .fade-newer-enter { opacity: 0; transform: translateY(-100%); }
    .fade-newer-enter-to { opacity: 1; transform: translateY(0%); }
</style>
