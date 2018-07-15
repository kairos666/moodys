<template>
    <transition-group class="post-list" name="post-list" tag="ul">
        <li class="post-list__item" v-for="postData in postsData" :key="postData.meta.timestamp">
            <post v-once :post-data="postData"></post>
        </li>
    </transition-group>
</template>

<script>
    import Post from '@/components/posts/Post';

    export default {
        props: {
            postsData: Array
        },
        components: {
            'post': Post
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_utils.scss';
    @import '../../styles/_variables.scss';
    .post-list { padding-left:0; list-style:none;
        > li + li { margin-top:$gutter-base; }
    }

    /* animation */
    .post-list-enter-active, .post-list-leave-active { transition: all $list-tr-duration; }
    .post-list-enter, .post-list-leave-to { opacity: 0; transform: translateX(100%); }
</style>
