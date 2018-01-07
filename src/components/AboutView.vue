<template>
    <div class="page-view page-about">
        <h1><i class="material-icons">help_outline</i>About <small>version alpha 4.4</small></h1>
        <p>
            Moodys is a PWA web application. Initially the aim was to create a simplistic demo app to try out PWA features.<br>
            Given the number of current features it has now grown into a real application for tracking people moods over time.
        </p>
        <ul class="mdl-card-holder">
            <li>
                <card class="home-card__project">
                    <span slot="header">
                        Moodys UI
                    </span>
                    <span slot="description">
                        <p>the mood notation agency. Mood boards to enable users & teams to keep track of morale trends.</p>
                        <p><b>Progressive Web App (PWA) - technical stack for the UI</b></p>
                        <p>
                            Based on <a class="moodys-link" href="https://vuejs.org/" target="_blank" title="Vue documentation">Vue</a> JS framework.<br>
                            <a class="moodys-link" href="https://material.io/icons/" target="_blank" title="Material icons documentation">Material Design Icons fonts</a> as icon library<br>
                            <a class="moodys-link" href="https://getmdl.io/index.html" target="_blank" title="MDL documentation">Material Design Lite</a> CSS framework and SASS scoped styles for components<br>
                            <a class="moodys-link" href="https://vuex.vuejs.org/en/" target="_blank" title="Vue-router documentation">Vuex</a> module for redux model implementation.<br>
                            <a class="moodys-link" href="https://router.vuejs.org/en/" target="_blank" title="Vuex documentation">Vue-router</a> module for app routes implementation (HTML5 history API enabled).<br>
                            <a class="moodys-link" href="https://github.com/vuejs-templates/pwa" target="_blank" title="template documentation">PWA webpack vue template</a> for project scaffolding.<br>
                            <a class="moodys-link" href="http://www.chartjs.org/" target="_blank" title="chartJS documentation">ChartJS</a> for data visualization.<br>
                            <a class="moodys-link" href="https://github.com/goldhand/sw-precache-webpack-plugin" target="_blank" title="sw-precache webpack plugin documentation">SW-precache webpack plugin</a> for service worker dynamic generation (sw-precache new version rewrite is named workbox).<br>
                            <ul>
                                <li>enables web app when offline</li>
                                <li>faster load times (smart cache strategies with service workers SW)</li>
                                <li>enables background actions (ex: push notifications) even when browser is closed</li>
                            </ul>
                            <a class="moodys-link" href="https://firebase.google.com/" target="_blank" title="Firebase website">Firebase</a> Free tier account provides:
                            <ul>
                                <li>hosting for the web app</li>
                                <li>noSQL database (auto-synchronization over websocket)</li>
                                <li>account management (security, forgot password, change password, ...)</li>
                            </ul>
                        </p>
                    </span>
                    <span slot="actions">
                        <a class="mdl-button mdl-button--colored" href="https://github.com/kairos666/moodys" target="_blank" title="go to moodys UI github repo">github</a>
                        <a class="mdl-button mdl-button--raised mdl-button--colored" href="https://github.com/kairos666/moodys/issues/new" target="_blank" title="go to moodys UI issues">raise issue</a>
                    </span>
                </card>
            </li>
            <li>
                <card class="home-card__project">
                    <span slot="header">
                        Moodys backend
                    </span>
                    <span slot="description">
                        <p>Web push notification micro service. Middleware for sending sending push notifications with encrypted payloads to all subscribed Moodys users.</p>
                        <p><b>Micro service - technical stack for the backend</b></p>
                        <p>
                            Based on <a class="moodys-link" href="https://feathersjs.com/" target="_blank" title="FeathersJS documentation">Feathers</a> JS framework on top of Express specifically designed for APIs building (Node).<br>
                            <a class="moodys-link" href="https://github.com/web-push-libs/web-push" target="_blank" title="Web-push documentation">Web push library</a> to ease web push notifications (VAPID key generation, payload encoding, ...)<br>
                            <a class="moodys-link" href="https://web-push-book.gauntface.com/" target="_blank" title="web push cookbook">Web Push Book</a> for useful information on web push notifications.<br>
                            <a class="moodys-link" href="https://wedeploy.com/" target="_blank" title="WeDeploy website">WeDeploy</a> Free tier account provides:
                            <ul>
                                <li>hosting for the service</li>
                                <li>HTTPS by default</li>
                            </ul>
                        </p>
                    </span>
                    <span slot="actions">
                        <a class="mdl-button mdl-button--colored" href="https://github.com/kairos666/moodys-backend" target="_blank" title="go to moodys backend github repo">github</a>
                        <a class="mdl-button mdl-button--raised mdl-button--colored" href="https://github.com/kairos666/moodys-backend/issues/new" target="_blank" title="go to moodys backend issues">raise issue</a>
                    </span>
                </card>
            </li>
        </ul>
    </div>
</template>

<script>
    import HomeCard from '@/components/nano/home-card';

    export default {
        components: {
            'card': HomeCard
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';

    .mdl-card-holder { list-style:none; padding-left:0; margin:-$gutter-base;
        > li { padding:$gutter-base; box-sizing:border-box; }
    }
    .mdl-card-holder {
        @include media(">desktop") { display:flex; flex-wrap:wrap;
            > li { flex-grow:0; flex-basis:50%; }
        }
    }
</style>