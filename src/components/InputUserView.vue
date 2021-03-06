<template>
    <form v-if="currentUserData">
        <header class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                <img class="material-icons mdl-list__item-avatar" :src="currentUserData.avatar" :alt="('avatar de ' + currentUserData.firstname)" >
                <div>
                    <h1>Change {{currentUserData.firstname}}'s mood</h1>
                    <span class="mdl-list__item-sub-title">{{currentUserData.motto}}</span>
                </div>
            </span>
        </header>
        <ul class="emoji-checkbox-list mdl-list">
            <li class="mdl-list__item" v-for="emoji in emojis">
                <button type="button" :title="`select ${emoji.label}`" @click.prevent="moodSelection(emoji.index, emoji.selected)" :class="{ active: emoji.selected }" class="mdl-list__item-primary-content fat-complex-buttons">
                    <emoji :mood="emoji.index"></emoji>
                    {{emoji.label}}
                </button>
            </li>
        </ul>
    </form>
</template>

<script>
    import Emoji from '@/components/nano/Emoji';
    import emojiHelpers from '@/utils/emoji-helpers';
    import { mapState, mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapState({
                currentUserID: state => state.auth.currentFirebaseUser.uid
            }),
            ...mapGetters({
                users: 'usersArray'
            }),
            currentUserData() { return this.users.find(user => (user.id === this.currentUserID)) },
            emojis() {
                // get current user mood
                let currentMood = this.currentUserData.currentMood;

                // remove the default element
                let emojisData = emojiHelpers.emojiDataArray.filter(el => (el.index !== null)).map(el => {
                    if (!currentMood) {
                        // no current mood
                        el.selected = false;
                        return el;
                    } else {
                        // not matching with current mood
                        el.selected = (el.index === currentMood);
                        return el;
                    }
                });

                return emojisData;
            }
        },
        components: {
            'emoji': Emoji
        },
        methods: {
            moodSelection(moodIndex, alreadySelected) {
                if (!alreadySelected) {
                    this.$store.dispatch('updateCurrentUserMood', moodIndex);
                    // go back (sometimes home, or other times users view)
                    this.$router.go(-1);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/nano/_user-list-item.scss';

    header .mdl-list__item-primary-content { flex-wrap:wrap;
        h1 { font-size:34px; margin-bottom:0;}
        span { flex:0 0 100%; }
    }
    button.mdl-list__item-primary-content { border:none; cursor:pointer; padding:0; }
    .emoji-checkbox-list { padding-bottom:0; margin-bottom:0;
        img { margin-right:16px; }
        li:nth-child(1) { background-color:rgba(255, 0, 0, .1); }
        li:nth-child(2) { background-color:rgba(255, 0, 0, .085); }
        li:nth-child(3) { background-color:rgba(255, 0, 0, .07); }
        li:nth-child(4) { background-color:rgba(255, 0, 0, .055); }
        li:nth-child(5) { background-color:rgba(255, 0, 0, .04); }
        li:nth-child(6) { background-color:$zebra-list-bg; }
        li:nth-child(7) { background-color:rgba(0, 255, 0, .04); }
        li:nth-child(8) { background-color:rgba(0, 255, 0, .055); }
        li:nth-child(9) { background-color:rgba(0, 255, 0, .07); }
        li:nth-child(10) { background-color:rgba(0, 255, 0, .085); }
        li:nth-child(11) { background-color:rgba(0, 255, 0, .1); }
        li:nth-child(12) { background-color:$zebra-list-bg; }
        li:nth-child(13) { background-color:$zebra-list-bg; }
        li { padding:0;
            button { padding:$gutter-base; }
        }
    }
</style>
