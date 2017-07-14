<template>
    <form>
        <header class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                <img class="material-icons mdl-list__item-avatar" :src="this.user.avatar" :alt="('avatar de ' + this.user.name)" >
                <h1>Change {{this.user.name}}'s mood</h1>
                <span class="mdl-list__item-sub-title">{{this.user.motto}}</span>
            </span>
        </header>
        <ul class="emoji-checkbox-list mdl-list">
            <li class="mdl-list__item" :class="{ active: emoji.selected }" v-for="emoji in emojis">
                <button type="button" :title="`select ${emoji.label}`" @click.prevent="moodSelection(emoji.index)" class="mdl-list__item-primary-content">
                    <emoji :mood="emoji.index"></emoji>
                    {{emoji.label}}
                </button>
            </li>
        </ul>
    </form>
</template>

<script>
    import data from '../fakeData.js';
    import Emoji from '@/components/Emoji';
    import moodConfig from '@/config/moods';
    import { getUserCurrentMood } from '@/utils/firebase-data-cruncher';

    export default {
        props: ['id'],
        computed: {
            user() {
                let user = data.users.find(user => (user.id === parseInt(this.id)));
                return user;
            },
            emojis() {
                // get current user mood
                let currentMood = getUserCurrentMood(this.id, this.$root.moods);

                // remove the default element
                let emojisData = moodConfig.moodIndexes.filter(el => (el !== null));

                // format array
                emojisData = emojisData.map(el => {
                    if (!currentMood) return { index: el, selected: false };

                    return {
                        index: el,
                        selected: (el === currentMood.value)
                    };
                }).map((el, index) => {
                    el.label = moodConfig.moodLabels[index];
                    return el;
                });

                return emojisData;
            }
        },
        components: {
            'emoji': Emoji
        },
        methods: {
            moodSelection(moodIndex) {
                this.$firebaseActions.updateMood(moodIndex, this.id);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';
    @import '../styles/_variables.scss';
    @import '../styles/nano/_user-list-item.scss';

    header .mdl-list__item-primary-content { flex-wrap:wrap;
        h1 { font-size:34px; }
        span { flex:0 0 100%; }
    }
    button.mdl-list__item-primary-content { background:none; border:none; cursor:pointer; padding:0; }
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
        li { padding-top:$gutter-base; padding-bottom:$gutter-base;
            &:hover { background-color:lighten($primary, 10%);
                button { color:#fff; font-weight:bold; }
            }
            &.active { background-color:$primary;
                button { color:#fff; font-weight:bold; }
            }            
        }
    }
</style>
