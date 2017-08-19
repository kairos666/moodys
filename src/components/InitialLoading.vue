<template>
    <div class="page-view initial-loading-page">
        
    </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    .initial-loading-page { position:absolute; left:0; right:0; top:0; bottom:0; z-index:0; 
        padding:$gutter-base; 
        background:url('/static/img/gifs/loading.gif') #fff no-repeat 50% 50%;
        background-size:contain;
    }
</style>
