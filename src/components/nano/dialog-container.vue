<template>
    <div v-if="isDialogOpen">
        <component :is="dialogType" @close-dialog="hideDialog"></component>
    </div>
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
                console.log(evt);
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
    @import '../../styles/_utils.scss';
    @import '../../styles/_include-media.scss';
    @import '../../styles/_variables.scss';
</style>
