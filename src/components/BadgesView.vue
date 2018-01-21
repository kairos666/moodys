<template>
    <div>
        <h1><i class="material-icons">verified_user</i>My Badges</h1>
        <h2>Profile Completion</h2>
        <h2>Usage</h2>
        <h2>Mood quality</h2>
        <flip-card>
            <span slot="front">FRONT</span>
            <span slot="back">BACK</span>
        </flip-card>
        <ul class="mdl-list">
            <li class="mdl-list__item">Adventurer - visited all pages</li>
            <li class="mdl-list__item">Lost in translation - went to 404 page</li>
            <li class="mdl-list__item">no more faceless - got a custom avatar</li>
            <li class="mdl-list__item">goldfish - forgot password mechanism X1</li>
            <li class="mdl-list__item">Alzeihmer - forgot password mechanism X3</li>
            <li class="mdl-list__item">mood alert - subscribed for notifications</li>
            <li class="mdl-list__item">mood monitor - multiple subscriptions for notifications</li>
            <li class="mdl-list__item">fast hand - clicked on notification</li>
            <li class="mdl-list__item">reaction trigger - your mood update notification nudged someone else mood update</li>
            <li class="mdl-list__item">chain reaction - your mood update notification nudged two persons to update their mood</li>
            <li class="mdl-list__item">Back to the future - went more than one month in the past</li>
            <li class="mdl-list__item">Fortuneteller - tried to time travel more than a month in the future</li>
            <li class="mdl-list__item">Moodist peon - first mood update</li>
            <li class="mdl-list__item">Moodist baron - updated mood three days straight</li>
            <li class="mdl-list__item">Moodist duke - updated mood a full week straight</li>
            <li class="mdl-list__item">Moodist archduke - updated mood a full month straight</li>
            <li class="mdl-list__item">Moodist king - updated mood three months straight</li>
            <li class="mdl-list__item">Moodist emperor - updated mood a full year straight</li>
            <li class="mdl-list__item">Happy days - positive mood for the last five updates</li>
            <li class="mdl-list__item">Depression - negative mood for the last five updates</li>
            <li class="mdl-list__item">Poker face - neurtral mood for the last three updates</li>
            <li class="mdl-list__item">Mood roller coaster - changed mood more than three times a day</li>
            <li class="mdl-list__item">Nirvana - mood updated to highest possible score</li>
            <li class="mdl-list__item">Dante's Inferno - mood updated to lowest possible score</li>
            <li class="mdl-list__item">come back - from negative to positive mood</li>
            <li class="mdl-list__item">mood swing - from positive to negative mood</li>
            <li class="mdl-list__item">the higher they get - mood increased 5 scores at once</li>
            <li class="mdl-list__item">the harder they fall - mood decreased 5 scores at once</li>
        </ul>
    </div>
</template>

<script>
    import FlipCard from '@/components/nano/flip-card';

    export default {
        components: {
            FlipCard
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';
    @import '../styles/_variables.scss';

    .mdl-list { display:flex; flex-wrap:wrap;
        @include media("<=tablet") {
            .mdl-list__item { flex-basis:0 0 auto; }
        }
        @include media(">tablet", "<=desktop") {
            .mdl-list__item { flex-basis:(100/2) + 0%; }
        }
        @include media(">desktop", "<=large-desktop") {
            .mdl-list__item { flex-basis:(100/3) + 0%; }
        }
        @include media(">large-desktop") { width:map-get($breakpoints, large-desktop); margin-left:auto; margin-right:auto;
            .mdl-list__item { flex-basis:(100/4) + 0%; }
        }
    }
</style>
