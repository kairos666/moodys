<template>
    <div>
        <h1 class="sr-only">Moodys</h1>
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
                            <figure class="profile-figure">
                                <img class="avatar" :src="currentUserData.avatar" :alt="('avatar de ' + currentUserData.firstname + ' ' + currentUserData.lastname)" >
                                <figcaption>
                                    <span class="name">{{currentUserData.firstname}} {{currentUserData.lastname}}</span>
                                    <span class="motto">{{currentUserData.motto}}</span>
                                </figcaption>
                            </figure>
                        </span>
                    </home-card>
                </li>
                <li>
                    <home-card class="home-card__profile-mood-box">
                        <div slot="description">
                            <section>
                                <h3>today's mood</h3>
                                <figure class="mood-figure">
                                    <emoji :mood="'-5'"></emoji>
                                    <figcaption>apocalyptic</figcaption>
                                </figure>
                            </section>
                            <section>
                                <h3>my week's average mood</h3>
                                <figure class="mood-figure">
                                    <emoji :mood="'1'"></emoji>
                                    <figcaption>ok</figcaption>
                                </figure>
                            </section>
                        </div>
                    </home-card>
                </li>
            </ul>
        </section>
        <section  v-if="currentUserData" class="dashboard-section">
            <header>
                <h2><i class="material-icons">insert_chart</i>Moodys dashboard</h2>
            </header>
            <ul class="mdl-card-holder">
                <li>
                    <home-card class="home-card__allusers-mood-box">
                        <div slot="description">
                            <section>
                                <h3>today's average mood</h3>
                                <figure class="mood-figure">
                                    <emoji :mood="'-1'"></emoji>
                                    <figcaption>meh</figcaption>
                                </figure>
                            </section>
                            <section>
                                <h3>week's average mood</h3>
                                <figure class="mood-figure">
                                    <emoji :mood="'1'"></emoji>
                                    <figcaption>ok</figcaption>
                                </figure>
                            </section>
                        </div>
                    </home-card>
                </li>
                <li>
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
                            <figure class="profile-figure">
                                <img class="avatar" :src="currentUserData.avatar" :alt="('avatar de ' + currentUserData.firstname + ' ' + currentUserData.lastname)" >
                                <figcaption>
                                    <span class="name">{{currentUserData.firstname}} {{currentUserData.lastname}}</span>
                                    <span class="motto">{{currentUserData.motto}}</span>
                                </figcaption>
                            </figure>
                            <figure class="profile-figure">
                                <img class="avatar" :src="currentUserData.avatar" :alt="('avatar de ' + currentUserData.firstname + ' ' + currentUserData.lastname)" >
                                <figcaption>
                                    <span class="name">{{currentUserData.firstname}} {{currentUserData.lastname}}</span>
                                    <span class="motto">{{currentUserData.motto}}</span>
                                </figcaption>
                            </figure>
                        </div>
                    </home-card>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import HomeCard from '@/components/nano/home-card';
    import Emoji from '@/components/nano/Emoji';
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
            'weekly-chart': WeeklyChart
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';

    .profile-section h2,
    .auth-section h2 { margin-top:0; }

    .mdl-card-holder { list-style:none; padding-left:0; margin:-$gutter-base;
        > li { padding:$gutter-base; box-sizing:border-box; }
    }
</style>
