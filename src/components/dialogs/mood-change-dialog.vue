<template>
    <menu class="dialog-box dialog-box__mood-change">
        <button type="button" class="mdl-button mdl-button--raised mdl-button--colored" @click="onClose">close dialog</button>
    </menu>
</template>

<script>
    export default {
        methods: {
            onClose() {
                this.$emit('close-dialog');
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_include-media.scss';
    @import '../../styles/nano/_dialog-box.scss';
</style>
