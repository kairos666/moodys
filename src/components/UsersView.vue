<template>
    <div>
        <h1><i class="material-icons">group</i>Users</h1>
        <ul class="mdl-list">
            <li class="mdl-list__item mdl-list__item--two-line" @click.prevent="displayDetails(user.id)" :class="{ 'is-current-user':user.isCurrentUser }" v-for="user in users">
                <span class="mdl-list__item-primary-content">
                    <img class="material-icons mdl-list__item-avatar" :src="user.avatar" :alt="('avatar de ' + user.firstname + ' ' + user.lastname)" >
                    <span>{{user.firstname}} {{user.lastname}}</span>
                    <span class="mdl-list__item-sub-title">{{user.motto}}</span>
                </span>
                <span class="mdl-list__item-secondary-content">
                    <emoji mood="0"></emoji>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import Emoji from '@/components/nano/Emoji';
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                users: 'usersArray'
            })
        },
        methods: {
            displayDetails(id) {
                // only for current user
                if (id === this.$store.state.auth.currentFirebaseUser.uid) this.$router.push({ name: 'mood-input', params: { id: id } });
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
        .mdl-list__item { 
            &.is-current-user { background-color:$selected-color; cursor:pointer;
                &:active, &:focus, &:hover { background-color:$selected-focus-color; }
            }
        }
    }
</style>
