<template>
    <div>
        <h1><i class="material-icons">home</i>Moodys</h1>
        <section class="profile-section">
            <header>
                <h2>My moody</h2>
            </header>
            <ul class="mdl-card-holder">
                <li v-if="currentUserData"> <!-- if connected profile + edit profile button -->
                    <home-card>
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
                <li v-if="!currentUserData"> <!-- if not connected profile + sign in / sign up -->
                    <home-card>
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
        <section v-if="currentUserData">
            <header>
                <h2>Moodys dashboard</h2>
            </header>
            <ul class="mdl-card-holder">
                <li><home-card></home-card></li>
            </ul>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import emojiHelpers from '@/utils/emoji-helpers';
    import HomeCard from '@/components/nano/home-card';
    import Emoji from '@/components/nano/Emoji';

    export default {
        computed: {
            currentUserData() {
                return this.usersArray.find(user => user.isCurrentUser);
            },
            currentMood() {
                return (this.currentUserData) ? emojiHelpers.emojiData(this.currentUserData.currentMood) : '';
            },
            ...mapGetters({
                usersArray: 'usersArray'
            })
        },
        components: {
            'home-card': HomeCard,
            'emoji': Emoji
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';
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
    .mood-figure { margin:0 0 0 1rem; float:right; display:flex; justify-content:flex-end; flex-direction:row-reverse; align-items:center;
        figcaption { margin-right:$gutter-base; }
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
