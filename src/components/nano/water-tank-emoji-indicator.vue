<template>
    <figure ref="stageContainer" class="tank-container">
        
    </figure>
</template>

<script>
    import Konva from 'konva';
    import WaterTankHelpers from '@/utils/water-tank-emoji-indicator-helpers';
    import EmojiHelpers from '@/utils/emoji-helpers';

    export default {
        props: ['todayMood', 'weekMood'],
        data() {
            return {
                model: {
                    waterLevel: 0,
                    moodLevel: 0.5,
                    moodEmojiIndex: EmojiHelpers.emojiDataArray.findIndex(item => (item.index === null))
                },
                stageInstance: undefined,
                stageWidth: 0,
                stageHeight: 0,
                layerBg: undefined,
                layerMg: undefined,
                layerFg: undefined,
                waterTank: undefined,
                bubblesFountain: undefined,
                verticalStageOffset: 80,
                verticalLevelUpdateDuration: 2,
                moodIndicatorAmplitude: 18,
                moodIndicatorSwayThreshold: 1,
                moodEmojisCollection: [],
                moodEmojisWingURL: '/static/img/svg/wings.svg',
                moodEmojiBaseOptions: {
                    width: 100,
                    height: 100,
                    x: -50,
                    y: -55
                },
                moodEmojiWingsBaseOptions: {
                    id: 'emojiWings',
                    width: 300,
                    height: 100,
                    x: -150,
                    y: -75
                }
            };
        },
        watch: {
            weekMood: {
                handler: function(val) {
                    // update model
                    this.model.waterLevel = this.propToPercentConverter(val);
                    const yAxisWaterLevel = this.percentToStageHeightConverter(this.model.waterLevel);

                    // update Konva elements
                    if (this.waterTank) {
                        this.waterTank.y = yAxisWaterLevel;
                    }
                    if (this.bubblesFountain) {
                        this.bubblesFountain.maxY = yAxisWaterLevel;
                    }
                },
                immediate: true
            }
        },
        methods: {
            propToEmojiIndexConverter(moodScore) {
                return EmojiHelpers.emojiDataArray.findIndex(item => (item.index === moodScore));
            },
            propToPercentConverter(moodScore) {
                if (moodScore === null || moodScore === 'sick' || moodScore === 'holiday') {
                    return 0.5;
                } else {
                    return parseInt(moodScore) * 0.1 + 0.5;
                }
            },
            percentToStageHeightConverter(percent) {
                // convert percentage to real stage height (taking vertical margins into account)
                return this.verticalStageOffset + (1 - percent) * (this.stageHeight - 2 * this.verticalStageOffset);
            },
            buildStage() {
                // stage scaffolding
                this.stageInstance = new Konva.Stage({ container: this.$refs.stageContainer, width: this.stageWidth, height: this.stageHeight });

                // layers scaffolding
                this.layerBg = new Konva.Layer().hitGraphEnabled(false);
                this.layerMg = new Konva.Layer().hitGraphEnabled(false);
                this.layerFg = new Konva.Layer().hitGraphEnabled(false);
                this.stageInstance.add(this.layerBg, this.layerMg, this.layerFg);

                // attach water lines
                this.waterTank = new WaterTankHelpers.WaterTank(this.percentToStageHeightConverter(this.model.waterLevel), { stageWidth: this.stageWidth, stageHeight: this.stageHeight, layer: this.layerBg, verticalLevelUpdateDuration: this.verticalLevelUpdateDuration });
                this.layerBg.add(this.waterTank.instance);
                this.waterTank.launch();

                // attach bubbles fountain
                this.bubblesFountain = new WaterTankHelpers.BubblesFountain(this.percentToStageHeightConverter(this.model.waterLevel), { stageWidth: this.stageWidth, stageHeight: this.stageHeight });
                this.layerMg.add(this.bubblesFountain.instance);
                this.bubblesFountain.launch();

                // attach mood indicator
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
                this.waterTank.destroy();
                this.waterTank = undefined;
                this.bubblesFountain.destroy();
                this.bubblesFountain = undefined;

                // destroy stage
                this.stageInstance.destroy();
                this.stageInstance = undefined;
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
    .tank-container { margin:0; min-height:500px; overflow:hidden; }
</style>
