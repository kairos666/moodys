<template>
    <menu ref="stageContainer" class="dialog-box dialog-box__mood-change"></menu>
</template>

<script>
    import Konva from 'konva';
    import MoodMenuHelpers from '@/utils/mood-menu-helpers';

    export default {
        data() {
            return {
                stageInstance: undefined,
                stageWidth: 0,
                stageHeight: 0,
                layerBg: undefined,
                layerFg: undefined,
                mainSelection: undefined,
                selectors: undefined
            };
        },
        methods: {
            onClose() {
                this.$emit('close-dialog');
            },
            onMoodSelection(moodValue) {
                console.log('mood selected', moodValue);
            },
            resizeStage() {
                // destroy stage
                this.destroyKonva();

                // update stage dimensions
                this.stageWidth = this.$refs.stageContainer.offsetWidth;
                this.stageHeight = this.$refs.stageContainer.offsetHeight;

                // build stage
                this.buildStage();
            },
            destroyKonva() {
                // leave early if unecessary
                if (!this.stageInstance) return true;

                // destroy individual elements
                this.mainSelection.destroy();
                this.mainSelection = undefined;
                this.selectors.destroy();
                this.selectors = undefined;

                // destroy stage
                this.stageInstance.destroy();
                this.stageInstance = undefined;
            },
            buildStage() {
                // stage scaffolding
                this.stageInstance = new Konva.Stage({ container: this.$refs.stageContainer, width: this.stageWidth, height: this.stageHeight });

                // layers scaffolding
                this.layerBg = new Konva.Layer().hitGraphEnabled(true);
                this.layerFg = new Konva.Layer().hitGraphEnabled(false);
                this.stageInstance.add(this.layerBg, this.layerFg);

                // attach main mood selection display
                this.mainSelection = new MoodMenuHelpers.MainSelection({ currentMood: this.$store.getters.currentUserMood, stageWidth: this.stageWidth, stageHeight: this.stageHeight });
                this.layerFg.add(this.mainSelection.instance);
                this.mainSelection.launch();

                // attach all individual selectors - and listen to events
                this.selectors = new MoodMenuHelpers.Selectors({ stageWidth: this.stageWidth, stageHeight: this.stageHeight }, this.onMoodSelection);
                this.layerBg.add(this.selectors.instance);
                this.selectors.launch();

                this.stageInstance.draw();
            }
        },
        mounted() {
            // calculate stage size for the first time
            this.resizeStage();

            // setup resize behavior
            window.addEventListener('resize', this.resizeStage);
        },
        beforeDestroy() {
            // destroy stage
            this.destroyKonva();

            // remove resize listener
            window.removeEventListener('resize', this.resizeStage);
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_include-media.scss';
    @import '../../styles/nano/_dialog-box.scss';
</style>
