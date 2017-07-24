<template>
    <menu>
        <button class="mdl-button mdl-button--icon" @click.prevent="toggleVisibility">
            <i class="material-icons">more_vert</i>
        </button>
        <div class="mdl-menu__container" :class="{ 'is-visible': isVisible }">
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

    export default {
        data() {
            return {
                isVisible: false
            };
        },
        computed: {
            ...mapGetters({
                isAuthenticated: 'isAuthenticated'
            })
        },
        methods: {
            toggleVisibility() {
                this.isVisible = !this.isVisible;
            },
            onEditProfile() {
                if (this.isAuthenticated) {
                    // navigate to user profile
                    this.$router.push({ name: 'profile', params: { id: this.$store.state.currentFirebaseUser.uid } });
                }
            },
            onDisconnect() {
                // dispatch disconnect action to store
                if (this.isAuthenticated) {
                    this.$store.dispatch('logout');
                }
            }
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
    .mdl-menu__container { right:18px; top:44px; width:$dd-width; height:$dd-height; }
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
</style>
