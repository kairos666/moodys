<template>
    <button class="mdl-switch is-upgraded" :class="{ 'is-checked': checked }" @click="onToggleSwitch">
        <span class="mdl-switch__label">
            <slot></slot>
        </span>
        <div class="mdl-switch__track"></div>
        <div class="mdl-switch__thumb">
            <span class="mdl-switch__focus-helper"></span>
        </div>
    </button>
</template>

<script>
    /* same as switch-toggle but this time around the switch status is completely driven by props */
    export default {
        props: ['checked'],
        methods: {
            onToggleSwitch() { this.$emit('toggle') }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    .mdl-switch { width:auto; padding-left:47px; border:none; background:none; color:#fff; outline:none;
        .mdl-switch__label { left:0; }
        .mdl-switch__track { top:7px; }
        .mdl-switch__thumb { top:1px; border:2px solid #fff; transition:background-color $btn-tr-duration ease, left $btn-tr-duration ease; }
        &.is-checked {
            .mdl-switch__thumb { border:2px solid $selected-color; }
            .mdl-switch__track { background-color:rgba(0,0,0,.26); }
        }
    }
</style>
