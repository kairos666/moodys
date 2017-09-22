<template>
    <menu class="scope-selector">
        <button type="button" :class="{ 'active': activeScope.isDay }" @click="onScopeChange('day')">day</button>
        <button type="button" :class="{ 'active': activeScope.isWeek }" @click="onScopeChange('week')">week</button>
        <button type="button" :class="{ 'active': activeScope.isMonth }" @click="onScopeChange('month')">month</button>
    </menu>
</template>

<script>
    export default {
        props: ['scope'],
        computed: {
            activeScope() {
                return {
                    isDay: (this.scope === 'day'),
                    isWeek: (this.scope === 'week'),
                    isMonth: (this.scope === 'month')
                };
            }
        },
        methods: {
            onScopeChange(newScope) {
                if (newScope !== this.scope) this.$emit('scope-change', newScope);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    .scope-selector { display:flex; padding-left:0; margin:0;
        button { flex:1 1 (100/3)+0%; }
    }
    button { border:none; background-color:transparent; color:$medium-color; padding:$gutter-base; font-size:px2rem(17); line-height:px2rem(24); cursor:pointer; outline:none; transition:color $btn-tr-duration, background-color $btn-tr-duration;
        &:focus, &:hover { background-color:#fff; }
        &.active, &:active { background-color:lighten($primary, 5%); color:#fff; }
    }
</style>
