<template>
    <menu class="time-selector">
        <button class="previous-btn" type="button" @click="onPrevious()"><i class="material-icons">navigate_before</i><span class="sr-only">previous</span></button>
        <button class="next-btn" type="button" @click="onNext()"><i class="material-icons">navigate_next</i><span class="sr-only">next</span></button>
        <span class="current-selection">{{currentSelection.label}}</span>
    </menu>
</template>

<script>
    import timeHelpers from '@/utils/time-helpers';

    console.log(timeHelpers.getDateRange('day'));
    console.log(timeHelpers.getDateRange('week'));
    console.log(timeHelpers.getDateRange('month'));
    console.log(timeHelpers.getDateRange('day', timeHelpers.currentDayTimestamp()));
    console.log(timeHelpers.getDateRange('week', timeHelpers.currentDayTimestamp()));
    console.log(timeHelpers.getDateRange('month', timeHelpers.currentDayTimestamp()));

    export default {
        props: ['scope'],
        data() {
            return {
                currentSelection: timeHelpers.getDateRange(this.scope)
            };
        },
        methods: {
            onPrevious() {
                console.log('previous');
            },
            onNext() {
                console.log('next');
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    .time-selector { padding-left:0; margin:0;
        .previous-btn { float:left; vertical-align:bottom; }
        .next-btn { float:right; vertical-align:bottom; }
        .current-selection { overflow:hidden; font-size:px2rem(17); line-height:px2rem(24); background-color:#fff; display:block; padding:$gutter-base; text-align:center; }
    }
    button { border:none; background-color:lighten($primary, 5%); color:#fff; padding:$gutter-base; font-size:px2rem(17); line-height:px2rem(11); cursor:pointer; outline:none; transition:color $btn-tr-duration, background-color $btn-tr-duration;
        &:focus, &:hover, &:active { background-color:$primary; }
    }
</style>
