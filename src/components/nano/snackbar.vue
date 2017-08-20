<template>
    <aside class="snack" v-if="isSnackbarShown">
        <transition-group name="snack-list">
            <section class="snack__item" v-for="(item, index) in snacks" v-bind:key="index" v-html="item"></section>
        </transition-group>
    </aside>
</template>

<script>
    import { mapState } from 'vuex';
    import snackBarMessages from '@/config/snack-bar-messages';

    // react to all changes in snackable data
    export default {
        data() {
            return {
                snacks: []
            };
        },
        computed: {
            isSnackbarShown() { return (this.snacks.length !== 0) },
            ...mapState('offline/', {
                isDBOnline: 'isDBOnline'
            })
        },
        methods: {
            startSnack(content) {
                this.snacks.push(content);

                setTimeout(this.endSnack, 1500);
            },
            endSnack() {
                this.snacks.shift();
            }
        },
        watch: {
            isDBOnline(val) {
                if (val) {
                    // connected to DB
                    this.startSnack(snackBarMessages.onlineDB);
                } else {
                    // disconnected from DB
                    this.startSnack(snackBarMessages.offlineDB);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    aside { position:fixed; z-index:666; right:$gutter-base; bottom:$gutter-base; }

    .snack-list-enter-active, .snack-list-leave-active { transition: all .5s; }
    .snack-list-enter, .snack-list-leave-to { opacity: 0; transform: translateY(30px); }
</style>
