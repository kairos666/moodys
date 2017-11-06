<template>
    <menu>
        <router-link v-if="!isAuthenticated" class="mdl-button" to="/sign-up"><i class="material-icons">person_add</i>Sign up</router-link>
        <router-link v-if="!isAuthenticated" class="mdl-button mdl-button--raised" to="/authenticate"><i class="material-icons">fingerprint</i>Sign in</router-link>
        <switch-toggle 
            v-if="isAuthenticated && $store.state.notifications.isBrowserSupportOk && $store.state.notifications.isSWRegistered && $store.state.notifications.hasBeenInitialized && $store.state.offline.isDBOnline" 
            class="notif-switch" 
            label="notifications"
            :checked="$store.getters['notifications/notifEnabled']"
            @toggle="$store.dispatch('notifications/notificationActivationToggle')"
        ><i class="material-icons">sms</i></switch-toggle>
        <button class="profile-button" v-if="currentUser" @click.prevent="toggleVisibility">
            <img class="avatar" :src="currentUser.avatar" :alt="('avatar de ' + currentUser.firstname + ' ' + currentUser.lastname)" />
        </button>
        <div v-if="isAuthenticated" class="mdl-menu__container" :class="{ 'is-visible': isVisible }">
            <div class="mdl-menu__outline mdl-menu--bottom-right"></div>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-menu__outline">
                <li v-if="!isAuthenticated" class="mdl-menu__item"><router-link to="/authenticate"><i class="material-icons">fingerprint</i>Sign in</router-link></li>
                <li v-if="!isAuthenticated" class="mdl-menu__item"><router-link to="/sign-up"><i class="material-icons">person_add</i>Sign up</router-link></li>
                <li v-if="isAuthenticated" class="mdl-menu__item">
                    <a href="#" @click.prevent="onEditProfile" title="Edit my profile"><i class="material-icons">account_box</i>Edit profile</a>
                </li>
                <li v-if="isAuthenticated" class="mdl-menu__item--full-bleed-divider"></li>
                <li v-if="isAuthenticated" class="mdl-menu__item">
                    <a href="#" @click.prevent="onDisconnect" title="Sign out my profile"><i class="material-icons">exit_to_app</i>Disconnect</a>
                </li>
            </ul>
        </div>
    </menu>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Switch from '@/components/nano/switch-async';

    export default {
        data() {
            return {
                isVisible: false
            };
        },
        computed: {
            ...mapGetters({
                isAuthenticated: 'isAuthenticated'
            }),
            currentUser() { return this.$store.getters.usersArray.find(user => (user.isCurrentUser === true)) }
        },
        methods: {
            toggleVisibility() {
                this.isVisible = !this.isVisible;
            },
            onEditProfile() {
                if (this.isAuthenticated) {
                    // navigate to user profile
                    this.$router.push({ name: 'profile' });
                }
            },
            onDisconnect() {
                // dispatch disconnect action to store
                if (this.isAuthenticated) {
                    this.$store.dispatch('logout');
                }
            }
        },
        components: {
            'switch-toggle': Switch
        },
        created() {
            // listen to route change and close if navigation occur
            this.$router.beforeEach((to, from, next) => {
                this.isVisible = false;
                next();
            });
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';

    $dd-width: 136px;
    $dd-height: 96px;
    .mdl-menu__container { right:18px; top:50px; width:$dd-width; height:$dd-height; }
    .mdl-menu__outline { width:$dd-width; height:$dd-height; }
    .mdl-menu { padding-top:0; padding-bottom:0; }
    .mdl-menu__item { padding-left:0; padding-right:0;
        a { display:block; padding-left:$gutter-base*2; padding-right:$gutter-base*2; text-decoration:none; color:$primary; }
        .material-icons { position:relative; top:7px; }
    }
    .is-visible { 
        .mdl-menu { opacity:1; z-index:999; clip:rect(0 $dd-width $dd-height 0); }
        .mdl-menu__outline { opacity:1; transform:scale(1); z-index:999; }
    }

    .mdl-button { color:#fff; }
    .profile-button { border:none; background:none; padding:0; outline:none; cursor:pointer;
        .avatar { border-radius:25%; width:45px; height:45px; }
    }
    /* TODO remove display:none when feature is ready */
    .notif-switch { margin-right:$gutter-base*2; display:none; }
</style>
