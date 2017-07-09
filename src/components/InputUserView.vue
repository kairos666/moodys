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
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="-5"></emoji>
                    Apocalyptic mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="-4"></emoji>
                    Horrible mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="-3"></emoji>
                    Very bad mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="-2"></emoji>
                    Bad mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="-1"></emoji>
                    Meeeh mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="0"></emoji>
                    Neutral mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="1"></emoji>
                    Okay mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="2"></emoji>
                    Good mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="3"></emoji>
                    Very good mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="4"></emoji>
                    Crazy good mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="5"></emoji>
                    Ecstatic mood
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="holiday"></emoji>
                    No mood - holiday
                </span>
            </li>
            <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <emoji mood="sick"></emoji>
                    No mood - sickness
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
                name: 'Trent Reznor',
                motto: 'Ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn',
                avatar: 'https://api.adorable.io/avatars/60/trent@adorable.png'
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
