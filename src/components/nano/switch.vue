<template>
    <label class="mdl-switch is-upgraded" :class="{ 'is-checked': checked }" :for="checkboxID">
        <input type="checkbox" :id="checkboxID" class="mdl-switch__input" v-model="checked">
        <span class="mdl-switch__label">
            <slot></slot>
        </span>
        <div class="mdl-switch__track"></div>
        <div class="mdl-switch__thumb">
            <span class="mdl-switch__focus-helper"></span>
        </div>
    </label>
</template>

<script>
    export default {
        props: ['initial-state'],
        data() {
            return {
                id: undefined,
                checked: this.initialState
            };
        },
        computed: {
            checkboxID() { return 'switch-form-input-' + this.id }
        },
        mounted() {
            this.id = this._uid;
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    .mdl-switch { width:auto; padding-left:47px;
        .mdl-switch__label { left:0; }
        .mdl-switch__track { top:7px; }
        .mdl-switch__thumb { top:1px; border:2px solid #fff; }
        &.is-checked {
            .mdl-switch__thumb { border:2px solid $selected-color; }
            .mdl-switch__track { background-color:rgba(0,0,0,.26); }
        }
    }
</style>
