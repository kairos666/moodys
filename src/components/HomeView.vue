<template>
    <div>
        <h1 class="sr-only">Moodys</h1>
        <div class="section-wrapper">
            <section  v-if="!currentUserData" class="auth-section">
                <header>
                    <h2><i class="material-icons">fingerprint</i>My moody</h2>
                </header>
                <ul class="mdl-card-holder">
                    <li>
                        <home-card class="home-card__authenticate-box">
                            <span slot="header">no authenticated user</span>
                            <span slot="description">Please sign in/up if you want to access data on moodys</span>
                            <span slot="actions">
                                <router-link class="mdl-button mdl-button--colored" :to="{ name: 'sign up' }">sign up</router-link>
                                <router-link class="mdl-button mdl-button--colored" :to="{ name: 'authenticate' }">sign in</router-link>
                            </span>
                        </home-card>
                    </li>
                </ul>
            </section>
            <section  v-if="currentUserData" class="profile-section">
                <header>
                    <h2><i class="material-icons">account_box</i>My moody</h2>
                </header>
                <ul class="mdl-card-holder">
                    <li>
                        <home-card class="home-card__profile-box">
                            <span slot="description">
                                <profile-box :user="currentUserData"></profile-box>
                            </span>
                            <span slot="actions">
                                <router-link class="mdl-button" :to="{ name: 'profile' }">edit profile</router-link>
                                <router-link class="mdl-button mdl-button--raised mdl-button--colored" :to="{ name: 'mood-input' }">update mood</router-link>
                            </span>
                        </home-card>
                    </li>
                    <li>
                        <home-card class="home-card__mood-box home-card__mood-box-profile">
                            <div slot="description">
                                <double-mood-box 
                                    :title-left="'today\'s mood'" 
                                    :mood-left="$store.getters.currentUserMood" 
                                    :mood-right="$store.getters.currentUserWeekMoods.weekAverage"
                                    :title-right="'my week\'s average mood'"
                                ></double-mood-box>
                            </div>
                        </home-card>
                    </li>
                </ul>
            </section>
            <section  v-if="currentUserData" class="dashboard-section">
                <header>
                    <h2><i class="material-icons">insert_chart</i>All users</h2>
                </header>
                <ul class="mdl-card-holder">
                    <li class="singular-respondent-container">
                        <home-card class="home-card__single-respondent-box">
                            <div slot="description">
                                <completion-rate :completion-data="$store.getters.todayCompletionObject"></completion-rate>
                            </div>
                        </home-card>
                    </li>
                    <li>
                        <home-card class="home-card__mood-box home-card__mood-box-allusers">
                            <div slot="description">
                                <double-mood-box 
                                    :title-left="'today\'s average mood'" 
                                    :mood-left="averageTodayMoods" 
                                    :mood-right="averageWeekMoods.weekAverage"
                                    :title-right="'week\'s average mood'"
                                ></double-mood-box>
                            </div>
                        </home-card>
                    </li>
                    <li class="weekly-chart-container">
                        <home-card class="home-card__weekly-chart">
                            <span slot="header">weekly mood chart</span>
                            <span slot="description">
                                <weekly-chart :datasets="averageWeeklyMoodDataset" :full-week="isWeekEnd()"></weekly-chart>
                            </span>
                        </home-card>
                    </li>
                    <li>
                        <home-card class="home-card__allrespondent-profile-short-box">
                            <span slot="header">mood per respondent user</span>
                            <div slot="description">
                                <ul>
                                    <li v-for="someUser in usersArray.filter(user => (user.currentMood))">
                                        <profile-box :user="someUser" :mood="someUser.currentMood"></profile-box>
                                    </li>
                                </ul>
                                <completion-rate :completion-data="$store.getters.todayCompletionObject"></completion-rate>
                            </div>
                        </home-card>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import HomeCard from '@/components/nano/home-card';
    import Emoji from '@/components/nano/Emoji';
    import ProfileBox from '@/components/nano/profile-box';
    import DoubleMoodBox from '@/components/dashboard/double-mood-box';
    import CompletionRate from '@/components/dashboard/completion-rate';
    import WeeklyChart from '@/components/dashboard/weekly-chart';
    import timeHelpers from '@/utils/time-helpers';

    export default {
        computed: {
            currentUserData() {
                return this.usersArray.find(user => user.isCurrentUser);
            },
            averageWeeklyMoodDataset() {
                return [{
                    label: `daily average mood`,
                    backgroundColor: 'rgba(255, 87, 34, .3)',
                    borderColor: 'rgba(255, 87, 34, .3)',
                    data: this.averageWeekMoods.weekMoods,
                    fill: 'start'
                }, {
                    label: `${this.currentUserData.firstname} ${this.currentUserData.lastname}`,
                    borderColor: 'rgba(255, 87, 34, .75)',
                    data: this.currentUserWeekMood.weekMoods,
                    fill: false
                }];
            },
            ...mapGetters({
                usersArray: 'usersArray',
                currentUserWeekMood: 'currentUserWeekMoods', // currentuser today mood
                averageWeekMoods: 'averageWeekMoods', // all users average moods for the whole week
                averageTodayMoods: 'averageTodayMoods' // all users average mood for today
            })
        },
        methods: {
            isWeekEnd() { return timeHelpers.isWeekEnd() }
        },
        components: {
            'home-card': HomeCard,
            'emoji': Emoji,
            'profile-box': ProfileBox,
            'double-mood-box': DoubleMoodBox,
            'completion-rate': CompletionRate,
            'weekly-chart': WeeklyChart
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';

    .profile-section,
    .auth-section,
    .dashboard-section { 
        h2 { color:#fff; }
    }

    /* section level layout */
    @include media("<=large-desktop") {
        .profile-section,
        .auth-section {
            h2 { margin-top:0; }
        }
    }
    @include media(">large-desktop") {
        .section-wrapper { display:flex;
            > section { flex-grow:0;
                &:first-child { padding-right:$gutter-base; }
                &:last-child { padding-left:$gutter-base; }
                &.profile-section,
                &.auth-section { flex-basis:(100/3)+0%; }
                &.dashboard-section { flex-basis:(200/3)+0%; }
                h2 { margin-top:0; }
            }
        }
    }

    // specific cases - show single respondent box from tablet and above
    @include media("<=tablet") {
        .singular-respondent-container { display:none; }
    }
    // specific cases - show weekly chart as last element
    @include media(">tablet", "<=large-desktop") {
        .weekly-chart-container { order:666; }
    }

    /* inner section level layout */
    .mdl-card-holder { list-style:none; padding-left:0; margin:-$gutter-base;
        > li { padding:$gutter-base; box-sizing:border-box; }
    }
    .mdl-card-holder {
        @include media(">tablet", "<=large-desktop") { display:flex; flex-wrap:wrap;
            > li { flex-grow:0; flex-basis:50%; }
        }
        .dashboard-section & {
            @include media(">large-desktop") { display:flex; flex-wrap:wrap;
                > li { flex-grow:0; flex-basis:50%; }
            }
        }
    }
</style>
