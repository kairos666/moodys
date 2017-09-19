<template>
    <menu class="scope-selector">
        <button type="button" :class="{ 'active': isDay }" @click="onScope('day')">day</button>
        <button type="button" :class="{ 'active': isWeek }" @click="onScope('week')">week</button>
        <button type="button" :class="{ 'active': isMonth }" @click="onScope('month')">month</button>
    </menu>
</template>

<script>
    export default {
        data() {
            return {
                isDay: true,
                isWeek: false,
                isMonth: false
            };
        },
        methods: {
            onScope(scope) {
                this.isDay = (scope === 'day');
                this.isWeek = (scope === 'week');
                this.isMonth = (scope === 'month');
                console.log(scope);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    .scope-selector { display:flex; padding-left:0; margin:0 0 $gutter-base*2;
        button { flex:1 1 (100/3)+0%; }
    }
    button { border:none; background-color:transparent; color:$medium-color; padding:$gutter-base; font-size:px2rem(17); line-height:px2rem(24); cursor:pointer; outline:none; transition:color $btn-tr-duration, background-color $btn-tr-duration;
        &:focus, &:hover { background-color:#fff; }
        &.active, &:active { background-color:lighten($primary, 5%); color:#fff; }
    }
</style>
