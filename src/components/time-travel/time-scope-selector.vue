<template>
    <menu class="time-selector">
        <button type="button" @click="onPrevious()"><i class="material-icons">navigate_before</i><span class="sr-only">previous</span></button>
        <button type="button" @click="onNext()"><i class="material-icons">navigate_next</i><span class="sr-only">next</span></button>
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
    
</style>
