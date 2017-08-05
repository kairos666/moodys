<template>
    <div>
        <h1><i class="material-icons">home</i>Moodys</h1>
        <section>
            <header>
                <h2>My moody</h2>
            </header>
            <ul class="mdl-card-holder">
                <li v-if="currenUserData"> <!-- if connected profile + edit profile button -->
                    <home-card>
                        <span slot="description">
                            <figure class="profile-figure">
                                <img class="avatar" :src="currenUserData.avatar" :alt="('avatar de ' + currenUserData.firstname + ' ' + currenUserData.lastname)" >
                                <figcaption>
                                    <span class="name">{{currenUserData.firstname}} {{currenUserData.lastname}}</span>
                                    <span class="motto">{{currenUserData.motto}}</span>
                                </figcaption>
                            </figure>
                        </span>
                        <span slot="actions">
                            <router-link class="mdl-button mdl-button--colored" :to="{ name: 'profile' }">edit profile</router-link>
                        </span>
                    </home-card>
                </li> 
                <li> <!-- if connected current mood + update mood -->
                    <home-card>
                        <span slot="description">
                            <emoji :mood="currenUserData.currentMood"></emoji>
                            <span>Happy</span>
                        </span>
                        <span slot="actions">
                            <router-link class="mdl-button mdl-button--colored" :to="{ name: 'mood-input' }">update mood</router-link>
                        </span>
                    </home-card>
                </li>
                <li> <!-- if not connected profile + sign in / sign up -->
                    <home-card></home-card>
                </li>
            </ul>
        </section>
        <section>
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
    import HomeCard from '@/components/nano/home-card';
    import Emoji from '@/components/nano/Emoji';

    export default {
        computed: {
            currenUserData() {
                return this.usersArray.find(user => user.isCurrentUser);
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
    }
    .profile-figure { margin:0;
        img { float:left; border-radius:25%; margin-right:16px; }
        figcaption { overflow:hidden;
            span { display:block; }
            .name { font-size:px2rem(16); line-height:px2rem(21); color:rgba(0,0,0,.87); }
            .motto { font-size:px2rem(14); line-height:px2rem(18); color:rgba(0,0,0,.54); }
        }
    }
</style>
