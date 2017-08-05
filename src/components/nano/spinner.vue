<template>
    <div class="mdl-spinner is-active">
        <div class="mdl-spinner__layer mdl-spinner__layer-1">
            <div class="mdl-spinner__circle-clipper mdl-spinner__left">
                <div class="mdl-spinner__circle"></div>
            </div>
            <div class="mdl-spinner__gap-patch">
                <div class="mdl-spinner__circle"></div>
            </div>
            <div class="mdl-spinner__circle-clipper mdl-spinner__right">
                <div class="mdl-spinner__circle"></div>
            </div>
        </div>
        <div class="mdl-spinner__layer mdl-spinner__layer-2">
            <div class="mdl-spinner__circle-clipper mdl-spinner__left">
                <div class="mdl-spinner__circle"></div>
            </div>
            <div class="mdl-spinner__gap-patch">
                <div class="mdl-spinner__circle"></div>
            </div>
            <div class="mdl-spinner__circle-clipper mdl-spinner__right">
                <div class="mdl-spinner__circle"></div>
            </div>
        </div>
        <div class="mdl-spinner__layer mdl-spinner__layer-3">
            <div class="mdl-spinner__circle-clipper mdl-spinner__left">
                <div class="mdl-spinner__circle"></div>
            </div>
            <div class="mdl-spinner__gap-patch">
                <div class="mdl-spinner__circle"></div>
            </div>
            <div class="mdl-spinner__circle-clipper mdl-spinner__right">
                <div class="mdl-spinner__circle"></div>
            </div>
        </div>
        <div class="mdl-spinner__layer mdl-spinner__layer-4">
            <div class="mdl-spinner__circle-clipper mdl-spinner__left">
                <div class="mdl-spinner__circle"></div>
            </div>
            <div class="mdl-spinner__gap-patch">
                <div class="mdl-spinner__circle"></div>
            </div>
            <div class="mdl-spinner__circle-clipper mdl-spinner__right">
                <div class="mdl-spinner__circle"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    @keyframes rotate {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }

    .mdl-spinner { animation:rotate 1.5s infinite linear;
        &.is-active:after { content:none; }
    }
</style>
