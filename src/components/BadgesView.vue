<template>
    <div>
        <h1><i class="material-icons">verified_user</i>My Badges</h1>
        <ul class="mdl-list">
            <li class="mdl-list__item" v-for="badge in $store.getters['achievementsUtils/userBadges']">
                <badge-card :info="badge" :is-achieved="badge.achieved"></badge-card>
            </li>
        </ul>
    </div>
</template>

<script>
    import BadgeCard from '@/components/nano/badge-card';

    export default {
        components: {
            BadgeCard
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';
    @import '../styles/_variables.scss';

    .mdl-list { display:flex; flex-wrap:wrap;
        .mdl-list__item { min-height:300px; overflow:visible; }
        @include media("<=tablet") {
            .mdl-list__item { flex-basis:100%; }
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
