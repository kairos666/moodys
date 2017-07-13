<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <span class="mdl-layout-title">Moodys</span>
            </div>
        </header>
        <div ref="drawer" class="mdl-layout__drawer">
            <span class="mdl-layout-title">Moodys</span>
            <nav class="mdl-navigation">
                <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">All users</router-link>
            </nav>
        </div>
        <main class="mdl-layout__content">
            <div class="page-content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </main>
    </div>
</template>

<script>
    require('material-design-lite');

    export default {
        name: 'app',
        methods: {
            hideMenu: function() {
                this.$refs.drawer.classList.remove('is-visible');
                document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible');
            }
        }
    };
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    @import url('../node_modules/material-design-lite/dist/material.deep_orange-blue.min.css');
    @import './styles/_variables.scss';
    @import './styles/_general.scss';
</style>
