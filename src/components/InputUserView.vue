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
            <li class="mdl-list__item" v-for="emoji in emojis">
                <span class="mdl-list__item-primary-content">
                    <emoji :mood="emoji.index"></emoji>
                    {{emoji.label}}
                </span>
            </li>
        </ul>
    </form>
</template>

<script>
    import data from '../fakeData.js';
    import Emoji from '@/components/Emoji';

    export default {
        props: ['id'],
        data() {
            return {
                emojis: [
                    { index: '-5', label: 'This is hell' },
                    { index: '-4', label: 'Horrible mood' },
                    { index: '-3', label: 'Very bad mood' },
                    { index: '-2', label: 'Bad mood' },
                    { index: '-1', label: 'Meeeh mood' },
                    { index: '0', label: 'Neutral mood' },
                    { index: '1', label: 'Okay mood' },
                    { index: '2', label: 'Good mood' },
                    { index: '3', label: 'Very good mood' },
                    { index: '4', label: 'Crazy good mood' },
                    { index: '5', label: 'this is heaven' },
                    { index: 'holiday', label: 'No mood - holiday' },
                    { index: 'sick', label: 'No mood - sickness' }
                ]
            };
        },
        computed: {
            user() {
                let user = data.users.find(user => (user.id === parseInt(this.id)));
                return user;
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

    header .mdl-list__item-primary-content { flex-wrap:wrap;
        h1 { font-size:34px; }
        span { flex:0 0 100%; }
    }
    .emoji-checkbox-list { padding-bottom:0; margin-bottom:0;
        img { margin-right:16px; }
        li { padding-top:$gutter-base; padding-bottom:$gutter-base; }
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
    }
</style>
