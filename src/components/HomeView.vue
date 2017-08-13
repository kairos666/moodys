<template>
    <div>
        <h1 class="sr-only">Moodys</h1>
        <section class="profile-section">
            <header>
                <h2><i class="material-icons">account_box</i>My moody</h2>
            </header>
            <ul class="mdl-card-holder">
                <li v-if="currentUserData"> <!-- if connected profile + edit profile button -->
                    <home-card class="home-card__profile">
                        <span slot="description">
                            <figure class="mood-figure">
                                <emoji :mood="currentUserData.currentMood"></emoji>
                                <figcaption>{{currentMood.label}}</figcaption>
                            </figure>
                            <figure class="profile-figure">
                                <img class="avatar" :src="currentUserData.avatar" :alt="('avatar de ' + currentUserData.firstname + ' ' + currentUserData.lastname)" >
                                <figcaption>
                                    <span class="name">{{currentUserData.firstname}} {{currentUserData.lastname}}</span>
                                    <span class="motto">{{currentUserData.motto}}</span>
                                </figcaption>
                            </figure>
                        </span>
                        <span slot="actions">
                            <router-link class="mdl-button" :to="{ name: 'profile' }">edit profile</router-link>
                            <router-link class="mdl-button mdl-button--colored" :to="{ name: 'mood-input' }">update mood</router-link>
                        </span>
                    </home-card>
                </li>
                <li v-if="currentUserData"> <!-- if connected weekly status -->
                    <home-card class="home-card__weekly-user-chart">
                        <span slot="header">my week</span>
                        <span slot="description">
                            <weekly-chart :datasets="userWeeklyMoodDataset" :full-week="isWeekEnd()"></weekly-chart>
                        </span>
                    </home-card>
                </li>
                <li v-if="!currentUserData"> <!-- if not connected profile + sign in / sign up -->
                    <home-card class="home-card__authenticate">
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
        <section class="dashboard-section" v-if="currentUserData">
            <header>
                <h2><i class="material-icons">insert_chart</i>Moodys dashboard</h2>
            </header>
            <ul class="mdl-card-holder">
                <li>
                    <home-card class="home-card__day-indicator">
                        <span slot="header">Today's indicators</span>
                        <span slot="description">
                            <completion-rate></completion-rate>
                            <average-mood></average-mood>
                        </span>
                    </home-card>
                </li>
                <li>
                    <home-card class="home-card__weekly-chart">
                        <span slot="header">weekly average</span>
                        <span slot="description">
                            <weekly-chart :datasets="averageWeeklyMoodDataset" :full-week="isWeekEnd()"></weekly-chart>
                        </span>
                    </home-card>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import emojiHelpers from '@/utils/emoji-helpers';
    import HomeCard from '@/components/nano/home-card';
    import Emoji from '@/components/nano/Emoji';
    import AverageMood from '@/components/dashboard/average-mood';
    import CompletionRate from '@/components/dashboard/completion-rate';
    import WeeklyChart from '@/components/dashboard/weekly-chart';
    import timeHelpers from '@/utils/time-helpers';

    export default {
        computed: {
            currentUserData() {
                return this.usersArray.find(user => user.isCurrentUser);
            },
            currentMood() {
                return (this.currentUserData) ? emojiHelpers.emojiData(this.currentUserData.currentMood) : '';
            },
            userWeeklyMoodDataset() {
                return [{
                    label: `${this.currentUserData.firstname} ${this.currentUserData.lastname}`,
                    backgroundColor: 'rgba(0, 150, 136, .5)',
                    data: this.currentUserWeekMood.weekMoods
                }];
            },
            averageWeeklyMoodDataset() {
                return [{
                    label: `daily average mood`,
                    backgroundColor: 'rgba(0, 150, 136, .5)',
                    data: this.averageWeekMoods.weekMoods
                }];
            },
            ...mapGetters({
                usersArray: 'usersArray',
                currentUserWeekMood: 'currentUserWeekMoods',
                averageWeekMoods: 'averageWeekMoods'
            })
        },
        methods: {
            isWeekEnd() { return timeHelpers.isWeekEnd() }
        },
        components: {
            'home-card': HomeCard,
            'emoji': Emoji,
            'average-mood': AverageMood,
            'completion-rate': CompletionRate,
            'weekly-chart': WeeklyChart
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';
    .profile-section h2 { margin-top:0; }
    .mdl-card-holder { list-style:none; padding-left:0; margin:-$gutter-base; display:flex; flex-wrap:wrap; justify-content:space-between;
        > li { flex:1 1 auto; padding:$gutter-base; box-sizing:border-box; }
        @include media(">tablet", "<=desktop") {
            > li { flex:1 1 50%; }
        }
        @include media(">desktop", "<=large-desktop") {
            > li { flex:1 1 (100/3)+0%; }
        }
        @include media(">large-desktop") {
            > li { flex:1 1 25%; }
        }
        .profile-section & {
            @include media(">tablet", "<=large-desktop") {
                > li { flex-grow:0; flex-basis:50%; }
            }
            @include media(">large-desktop") {
                > li { flex-grow:0; flex-basis:(100/3)+0%; }
            }
        }
    }
    .profile-figure { margin:0; overflow:hidden;
        img { float:left; border-radius:25%; margin-right:16px; }
        figcaption { overflow:hidden;
            span { display:block; }
            .name { font-size:px2rem(16); line-height:px2rem(21); color:rgba(0,0,0,.87); }
            .motto { font-size:px2rem(14); line-height:px2rem(18); color:rgba(0,0,0,.54); }
        }
    }
</style>
