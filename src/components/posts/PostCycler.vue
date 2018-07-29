<template>
    <transition name="fade">
        <post v-if="posts.length !== 0" single :post-data="posts[index]"></post>
        <p v-else>There are no twoots yet.</p>
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
        components: {
            Post
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    .fade-enter-active, .fade-leave-active { transition: all .5s ease; }
    .fade-enter, .fade-leave-to { opacity: 0; transform: translateX(100%); }
</style>
