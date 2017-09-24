<template>
    <section class="time-travel">
        <scope-selector :scope="scope" @scope-change="onScopeChange"></scope-selector>
        <item-selector :value="timeTarget.label" @value-change="onValueChange"></item-selector>
    </section>
</template>

<script>
    import moment from 'moment';
    import timeHelpers from '@/utils/time-helpers';
    import ScopeSelector from '@/components/nano/scope-selector';
    import TimeSelector from '@/components/nano/time-selector';

    export default {
        data() {
            return {
                scope: 'week',
                currentDateCursor: timeHelpers.currentDayTimestamp()
            };
        },
        computed: {
            timeTarget() { return timeHelpers.getDateRange(this.scope, this.currentDateCursor) }
        },
        methods: {
            onScopeChange(newValue) {
                this.scope = newValue;
            },
            onValueChange(direction) {
                let result;

                switch (direction) {
                case 'previous':
                    // take minimum range - substract 1 day
                    result = moment(this.timeTarget.range[0]).subtract(1, 'days');
                    break;
                case 'next':
                    // take maximum range - add 1 day (exception for weeks need to add 3 days to account for weekends)
                    let addAmount = 1;
                    if (this.scope === 'week') addAmount = 3;
                    result = moment(this.timeTarget.range[1]).add(addAmount, 'days');
                    break;
                }

                this.currentDateCursor = result;
            },
            emitTimeRange() {
                this.$emit('time-range-change', {
                    label: this.timeTarget.label,
                    scope: this.scope,
                    range: this.timeTarget.range
                });
            }
        },
        created() {
            // INITIAL - provide new parameters to whoever needs it
            this.emitTimeRange();
        },
        updated() {
            // UPDATE - provide new parameters to whoever needs it
            this.emitTimeRange();
        },
        components: {
            'scope-selector': ScopeSelector,
            'item-selector': TimeSelector
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    menu:first-child { margin-bottom:$gutter-base*2; }
</style>
