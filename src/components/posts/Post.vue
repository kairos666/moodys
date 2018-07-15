<template>
    <article class="post">
        {{postData.body}}
    </article>
</template>

<script>
    import Post from '@/store-modules/posts-module';

    export default {
        props: {
            postData: Post
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_utils.scss';
    @import '../../styles/_variables.scss';
</style>
