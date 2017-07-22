<template>
    <figure>
        <div class="mdl-progress mdl-progress__indeterminate">
            <div class="progressbar bar bar1" style="width: 0%;"></div>
            <div class="bufferbar bar bar2" style="width: 100%;"></div>
        </div>
        <figcaption>{{msg}}</figcaption>
    </figure>
</template>

<script>
    export default {
        props: ['msg']
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
</style>
