<template>
    <menu>
        <button class="mdl-button mdl-button--icon" @click.prevent="toggleVisibility">
            <i class="material-icons">more_vert</i>
        </button>
        <div class="mdl-menu__container" :class="{ 'is-visible': isVisible }">
            <div class="mdl-menu__outline mdl-menu--bottom-right"></div>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-menu__outline">
                <li v-if="!isAuthenticated" class="mdl-menu__item"><router-link to="/authenticate">Sign in</router-link></li>
                <li v-if="!isAuthenticated" class="mdl-menu__item"><router-link to="/sign-up">Sign up</router-link></li>
                <li v-if="isAuthenticated" class="mdl-menu__item">
                    <a href="#" @click.prevent="onEditProfile" title="Edit my profile">Edit profile</a>
                </li>
                <li v-if="isAuthenticated" class="mdl-menu__item--full-bleed-divider"></li>
                <li v-if="isAuthenticated" class="mdl-menu__item">
                    <a href="#" @click.prevent="onDisconnect" title="Sign out my profile">Disconnect</a>
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
        }
    };
</script>

<style scoped lang="scss">
    $dd-width: 150px;
    $dd-height: 120px;
    .mdl-menu__container { right:18px; top:44px; width:$dd-width; height:$dd-height; }
    .mdl-menu__outline { width:$dd-width; height:$dd-height; }
    .is-visible { 
        .mdl-menu { opacity:1; z-index:999; clip:rect(0 $dd-width $dd-height 0); }
        .mdl-menu__outline { opacity:1; transform:scale(1); z-index:999; }
    }
</style>
