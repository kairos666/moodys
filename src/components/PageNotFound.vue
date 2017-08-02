<template>
    <div class="page-view page-not-found">
        <h1>Page not found</h1>
        <p>Try navigating somewhere else<br><small>Tips: there is a navigation menu, try clicking the hamburger icon!</small></p>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    .page-not-found { position:absolute; left:0; right:0; top:0; bottom:0; z-index:0; 
        padding:$gutter-base; 
        background:url('/static/img/gifs/404.gif') #f3c600 no-repeat 50% 50%;
        background-size:contain;
    }
</style>
