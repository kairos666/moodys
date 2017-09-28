<template>
    <aside class="snack" v-if="isSnackbarShown">
        <transition-group @after-leave="afterSnackLeave" name="snack-list" tag="div">
            <section class="snack__item" v-for="(item, index) in snacks" v-bind:key="index" v-html="item"></section>
        </transition-group>
    </aside>
</template>

<script>
    import { EventBus } from '@/utils/events-bus';

    // react to all changes in snackable data
    export default {
        data() {
            return {
                snacks: [],
                isSnackbarShown: false
            };
        },
        methods: {
            startSnack(content) {
                this.isSnackbarShown = true;
                this.snacks.unshift(content);

                setTimeout(this.endSnack, 5000);
            },
            endSnack() {
                this.snacks.pop();
            },
            afterSnackLeave() {
                if (this.snacks.length === 0) this.isSnackbarShown = false;
            }
        },
        created() {
            // setup subscribing to notification event bus
            EventBus.$on('notifications', (evt) => { this.startSnack(evt.content) });
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    aside { position:fixed; z-index:666; right:$gutter-base; bottom:$gutter-base;
        > div { display:flex; flex-direction:column-reverse; }
    }

    .snack-list-enter-active, .snack-list-leave-active { transition: all .75s; }
    .snack-list-enter { opacity:0; transform: translateY(30px); }
    .snack-list-leave-to { opacity:0; transform: translateX(100%); }
</style>
