<template>
    <div>
        <h1 class="sr-only">Time travel</h1>
        <div class="section-wrapper">
            <section class="time-scope-section">
                <header>
                    <h2><i class="material-icons">alarm</i>Time travel</h2>
                </header>
                <ul class="mdl-card-holder">
                    <li>
                        <home-card class="home-card__time-box">
                            <div slot="description">
                                <time-travel @time-range-change="onTimeRangeChange"></time-travel>
                            </div>
                        </home-card>
                    </li>
                </ul>
            </section>
            <section  class="chart-section">
                <header>
                    <h2><i class="material-icons">timeline</i>mood chart</h2>
                </header>
                <ul class="mdl-card-holder">
                    <li>
                        <home-card  v-if="timeRange.scope === 'day'" class="home-card__allrespondent-profile-short-box">
                            <span slot="header">{{timeRange.label}}</span>
                            <div slot="description">
                                <transition-group name="fade" tag="ul">
                                    <li v-for="someUser in datasets.entries" v-bind:key="someUser.id">
                                        <profile-box :user="someUser" :mood="someUser.mood"></profile-box>
                                    </li>
                                </transition-group>
                                <completion-rate :completion-data="datasets.completion"></completion-rate>
                            </div>
                        </home-card>
                        <home-card v-else class="home-card__scoped-chart">
                            <div slot="description">
                                <week-chart v-if="timeRange.scope === 'week'" :datasets="datasets" :full-week="false">{{timeRange.label}}</week-chart>
                                <month-chart v-else :datasets="datasets">{{timeRange.label}}</month-chart>
                            </div>
                        </home-card>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import HomeCard from '@/components/nano/home-card';
    import ProfileBox from '@/components/nano/profile-box';
    import CompletionRate from '@/components/dashboard/completion-rate';
    import TimeTravel from '@/components/time-travel/time-travel';
    import WeeklyChart from '@/components/dashboard/weekly-chart';
    import MonthlyChart from '@/components/time-travel/monthly-chart';
    import { TimeTravelEvt } from '@/config/badges';
    import { EventBus } from '@/utils/events-bus';

    // return array with only moods corresponding to range
    let filteredMoodsPerRange = function(moods, range) {
        let minRange = range[0];
        let maxRange = range[1];
        return Object.keys(moods)
            .filter(timestamps => (timestamps >= minRange && timestamps <= maxRange))
            .map(timestamps => moods[timestamps]);
    };

    // return array with only one mood entry per full day (!should be user filtered first)
    let removeDayDuplicates = function(moods) {
        let allValuedDayTimestamps = Array.from(new Set(moods.map(item => item.dayTimestamp))); // remove duplicate at the same time

        // array of day entries array
        let result = allValuedDayTimestamps.map(dayStamp => moods.filter(item => (item.dayTimestamp === dayStamp)));

        // merge same day entries (keep the last one)
        result = result.map(dayEntries => {
            if (dayEntries.length === 1) return dayEntries[0];

            return dayEntries.reduce((prevItem, currentItem) => {
                return (prevItem.timestamp < currentItem.timestamp) ? currentItem : prevItem;
            });
        });

        return result;
    };

    // return array with inserted null values when needed
    let insertNoMoodEntries = function(moods, range) {
        let minRange = range[0];
        let maxRange = range[1];
        let extendedRange = [minRange];

        // add days until all days of the range + 1 are covered (start of day, end of day diff = 1000ms)
        while ((maxRange + 1000) > extendedRange[extendedRange.length - 1]) {
            extendedRange.push(moment(extendedRange[extendedRange.length - 1]).add(1, 'day').unix() * 1000);
        }
        extendedRange.pop();

        // perform insert if no valid entry is found
        return extendedRange.map(dayStamp => {
            let actualValue = moods.find(value => (value.dayTimestamp === dayStamp));
            if (actualValue) return actualValue;
            return {
                dayTimestamp: dayStamp,
                value: null
            };
        });
    };

    export default {
        data() {
            return {
                timeRange: {}
            };
        },
        computed: {
            datasets() {
                // provide corresponding dataset for charts
                let result;
                switch (this.timeRange.scope) {
                case 'day': result = this.dayDataSetBuilder(this.timeRange.range); break;
                case 'week': result = this.wideDataSetBuilder(this.timeRange.range, this.timeRange.userID); break;
                case 'month': result = this.wideDataSetBuilder(this.timeRange.range, this.timeRange.userID); break;
                }

                return result;
            }
        },
        methods: {
            onTimeRangeChange(newValue) {
                this.timeRange = newValue;

                // achievement - time travel related
                let achievementEvt = new TimeTravelEvt(newValue.range);
                EventBus.$emit(achievementEvt.type, achievementEvt);
            },
            dayDataSetBuilder(range) {
                // provide corresponding week mood data
                let users = this.$store.getters.usersArray;
                let moodsSubset = filteredMoodsPerRange(this.$store.state.moods, range).reverse();

                // format data array of respondent users with corresponding mood
                let dataResult = [];
                users.forEach(user => {
                    let moodEntry = moodsSubset.find(item => (item.uid === user.id));
                    if (moodEntry) {
                        dataResult.push({
                            mood: moodEntry.value,
                            avatar: user.avatar,
                            firstname: user.firstname,
                            id: user.id,
                            isCurrentUser: user.isCurrentUser,
                            lastname: user.lastname,
                            motto: user.motto
                        });
                    }
                });

                // completion object
                let completionResult = {
                    completionRate: Math.round((dataResult.length / users.length) * 100),
                    respondentNb: dataResult.length,
                    totalUserNb: users.length
                };

                return {
                    entries: dataResult,
                    completion: completionResult
                };
            },
            wideDataSetBuilder(range, uid) {
                // provide corresponding week mood data
                let user = this.$store.state.users[uid];
                let moodsSubset = filteredMoodsPerRange(this.$store.state.moods, range)
                    .filter(item => (item.uid === uid));

                // remove same day duplicates
                moodsSubset = removeDayDuplicates(moodsSubset);

                // insert no entry days if needed
                moodsSubset = insertNoMoodEntries(moodsSubset, range);

                // format data for week/month chart
                return [ {
                    label: `${user.firstname} ${user.lastname}`,
                    borderColor: 'rgba(255, 87, 34, .75)',
                    data: moodsSubset.map(item => item.value),
                    backgroundColor: 'rgba(255, 87, 34, .3)',
                    fill: 'start'
                }];
            }
        },
        components: {
            'home-card': HomeCard,
            'time-travel': TimeTravel,
            'profile-box': ProfileBox,
            'completion-rate': CompletionRate,
            'week-chart': WeeklyChart,
            'month-chart': MonthlyChart
        }
    };
</script>

<style scope lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';
    @import '../styles/nano/_cards.scss';

    .time-scope-section,
    .chart-section { 
        h2 { color:#fff; }
    }

    /* section level layout */
    @include media("<=large-desktop") {
        .time-scope-section {
            h2 { margin-top:0; }
        }
    }
    @include media(">large-desktop") {
        .section-wrapper { display:flex;
            > section { flex-grow:0;
                &:first-child { padding-right:$gutter-base; }
                &:last-child { padding-left:$gutter-base; }
                &.time-scope-section { flex-basis:(100/3)+0%; }
                &.chart-section { flex-basis:(200/3)+0%; }
                h2 { margin-top:0; }
            }
        }
    }

    /* inner section level layout */
    .mdl-card-holder { list-style:none; padding-left:0; margin:-$gutter-base;
        > li { padding:$gutter-base; box-sizing:border-box; }
    }
    .mdl-card-holder {
        @include media(">tablet", "<=large-desktop") { display:flex; flex-wrap:wrap;
            > li { flex-grow:0; flex-basis:50%; }
        }
        .chart-section & {
            @include media(">tablet", "<=large-desktop") { display:flex; flex-wrap:wrap;
                > li { flex:1 1 100%; }
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity $list-tr-duration, transform $list-tr-duration;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateX(3*$gutter-base);
    }
</style>
