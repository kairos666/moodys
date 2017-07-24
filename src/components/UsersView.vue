<template>
    <div>
        <h1><i class="material-icons">group</i>Users</h1>
        <ul class="mdl-list">
            <li class="mdl-list__item mdl-list__item--two-line" v-for="user in users">
                <span class="mdl-list__item-primary-content">
                    <img class="material-icons mdl-list__item-avatar" :src="user.avatar" :alt="('avatar de ' + user.name)" >
                    <span>{{user.name}}</span>
                    <span class="mdl-list__item-sub-title">{{user.motto}}</span>
                </span>
                <span class="mdl-list__item-secondary-content">
                    <button class="mdl-button mdl-js-button mdl-button--icon" @click.prevent="displayDetails(user.id)">
                        <emoji mood="0"></emoji>
                    </button>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import data from '../fakeData.js';
    import Emoji from '@/components/nano/Emoji';

    export default {
        data() {
            return {
                users: data.users,
                teams: data.teams,
                moods: data.moods
            };
        },
        methods: {
            displayDetails(id) {
                this.$router.push({ name: 'mood-input', params: { id: id } });
            }
        },
        components: {
            'emoji': Emoji
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';
    @import '../styles/_variables.scss';
    @import '../styles/nano/_user-list-item.scss';

    /* user list */
    ul { margin:0; padding:$gutter-base 0; list-style:none;
        li { padding:$gutter-base (2*$gutter-base); }
    }

    /* RWD */
    .mdl-list {
        @include media("<=tablet") {
            .mdl-list__item:nth-child(even) { background-color:$zebra-list-bg; }
        }
        @include media(">tablet") {
            display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-start;
            .mdl-list__item { flex:0 0 auto; }
        }
        @include media(">tablet", "<=large-desktop") {
            .mdl-list__item { flex-basis:50%;
                &:nth-child(4n), 
                &:nth-child(4n+1) { background-color:$zebra-list-bg; }
            }
        }
        @include media(">large-desktop") {
            .mdl-list__item { flex-basis:(100/3)+0%; 
                &:nth-child(even) { background-color:$zebra-list-bg; }
            }
        }
    }
</style>
