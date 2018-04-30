<template>
    <transition name="dialog-transition">
        <div class="dialog-obfuscator" v-if="isDialogOpen" @click.self="hideDialog">
            <component :is="dialogType" @close-dialog="hideDialog"></component>
        </div>
    </transition>
</template>

<script>
    import { EventBus } from '@/utils/events-bus';

    export default {
        data() {
            return {
                isDialogOpen: false,
                dialogType: null
            };
        },
        created() {
            // bind to event bus
            EventBus.$on('dialog', (evt) => {
                // select which dialog box to show
                switch (evt.subType) {
                case 'mood-change-dialog': this.showDialog(evt.subType, evt.options); break;
                }
            });
        },
        methods: {
            showDialog(dialogType, options) {
                this.dialogType = dialogType;
                this.isDialogOpen = true;
            },
            hideDialog() {
                this.isDialogOpen = false;
                this.dialogType = null;
            }
        },
        components: {
            'mood-change-dialog': () => import(/* webpackChunkName: "mood-change-dialog" */ '../dialogs/mood-change-dialog')
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';

    .dialog-obfuscator { background-color:$medium-color; position:fixed; z-index:5; width:100vw; height:100vh; }

    .dialog-transition-enter-active, .dialog-transition-leave-active { transition: opacity $page-tr-duration ease; }
    .dialog-transition-enter, .dialog-transition-leave-to { opacity: 0; }
</style>
