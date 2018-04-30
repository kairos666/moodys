<template>
    <div>I'm a dialog box - mood changes
        <button type="button" class="mdl-button mdl-button--raised mdl-button--colored" @click="onClose">close dialog</button>
    </div>
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
    @import '../../styles/_utils.scss';
    @import '../../styles/_include-media.scss';
    @import '../../styles/_variables.scss';
</style>
