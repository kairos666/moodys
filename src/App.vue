<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <span class="mdl-layout-title"><router-link class="mdl-navigation__link" to="/" @click.native="hideMenu"><img src="/static/img/icons/favicon-32x32.png" />Moodys <small>[alpha V4.0]</small></router-link></span>
                <div class="mdl-layout-spacer"></div>
                <profile-nav></profile-nav>
            </div>
        </header>
        <div ref="drawer" class="mdl-layout__drawer">
            <span class="mdl-layout-title">Moodys</span>
            <nav class="mdl-navigation">
                <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu"><i class="material-icons">home</i>Home</router-link>
                <router-link class="mdl-navigation__link" to="/users" @click.native="hideMenu"><i class="material-icons">group</i>All users</router-link>
                <router-link class="mdl-navigation__link" to="/time-travel" @click.native="hideMenu"><i class="material-icons">alarm</i>Time travel</router-link>
            </nav>
        </div>
        <main class="mdl-layout__content">
            <div class="page-content" :class="routeClass">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </main>
        <snack-bar></snack-bar>
    </div>
</template>

<script>
    import ProfileNav from '@/components/nano/profile-nav';
    import SnackBar from '@/components/nano/snackbar';
    require('material-design-lite');

    export default {
        name: 'app',
        methods: {
            hideMenu: function() {
                this.$refs.drawer.classList.remove('is-visible');
                document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible');
            }
        },
        computed: {
            routeClass() {
                return (this.$route && this.$route.name) ? this.$route.name.replace(' ', '-') : '';
            }
        },
        components: {
            'profile-nav': ProfileNav,
            'snack-bar': SnackBar
        }
    };
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    @import url('../node_modules/material-design-lite/dist/material.deep_orange-blue.min.css');
    @import './styles/_variables.scss';
    @import './styles/_utils.scss';
    @import './styles/_include-media.scss';
    @import './styles/_general.scss';
    @import './styles/_forms.scss';
    @import './styles/nano/_snackbar.scss';

    .mdl-layout-title img { margin-right:$gutter-base; }
</style>
