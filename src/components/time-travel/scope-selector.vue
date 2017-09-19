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

    .active { background-color:$primary; }
</style>
