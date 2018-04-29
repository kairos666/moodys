<template>
    <section class="time-travel">
        <scope-selector :scope="scope" @scope-change="onScopeChange"></scope-selector>
        <item-selector :value="timeTarget.label" @value-change="onDateChange"></item-selector>
        <user-selector v-if="(scope !== 'day')" :user="currentUser" @value-change="onUserChange"></user-selector>
    </section>
</template>

<script>
    import moment from 'moment';
    import { mapGetters } from 'vuex';
    import timeHelpers from '@/utils/time-helpers';
    import ScopeSelector from '@/components/nano/scope-selector';
    import TimeSelector from '@/components/nano/time-selector';
    import UserSelector from '@/components/nano/user-selector';
    import Users from '@/config/users';

    export default {
        data() {
            return {
                scope: 'week',
                currentDateCursor: timeHelpers.currentDayTimestamp(),
                currentUserID: this.$store.state.auth.currentFirebaseUser.uid
            };
        },
        computed: {
            timeTarget() { return timeHelpers.getDateRange(this.scope, this.currentDateCursor) },
            currentUser() { return this.extendedUsersArray.find(item => (item.id === this.currentUserID)) },
            ...mapGetters({
                usersArray: 'usersArray'
            }),
            extendedUsersArray() { return [...this.usersArray, Users.all] }
        },
        methods: {
            onScopeChange(newValue) {
                this.scope = newValue;
            },
            onDateChange(direction) {
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
            onUserChange(direction) {
                let userIndex = this.extendedUsersArray.findIndex(item => (item.id === this.currentUserID));
                let newUserIndex;

                switch (direction) {
                case 'previous':
                    // previous index in usersArray
                    newUserIndex = userIndex - 1;
                    if (newUserIndex < 0) newUserIndex = this.extendedUsersArray.length - 1;
                    break;
                case 'next':
                    // next index in usersArray
                    newUserIndex = userIndex + 1;
                    if (newUserIndex >= this.extendedUsersArray.length) newUserIndex = 0;
                    break;
                }

                this.currentUserID = this.extendedUsersArray[newUserIndex].id;
            },
            emitTimeRange() {
                this.$emit('time-range-change', {
                    label: this.timeTarget.label,
                    scope: this.scope,
                    range: this.timeTarget.range,
                    userID: this.currentUserID
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
            'item-selector': TimeSelector,
            'user-selector': UserSelector
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    menu.scope-selector { margin-bottom:$gutter-base*2; }
    menu.user-selector { margin-top:$gutter-base*2; }
</style>
