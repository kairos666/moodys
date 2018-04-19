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
                verticalStageOffset: 80,
                verticalLevelUpdateDuration: 2,
                bubblesCount: 4,
                bubblesPeriod: 2000,
                bubblesAmplitude: 1 / 6,
                bubblesCollection: [],
                moodIndicatorAmplitude: 18,
                moodIndicatorSwayThreshold: 1,
                moodEmojisCollection: [],
                moodEmojisWingURL: '/static/img/svg/wings.svg',
                bubbleBaseOptions: {
                    bubbleOuter: { x: -50, y: -50, fill: '#ffffff', visible: 'inherit', data: 'M50,0C22.386,0,0,22.386,0,50s22.386,50,50,50s50-22.386,50-50S77.614,0,50,0z M50,97.5 C23.767,97.5,2.5,76.233,2.5,50S23.767,2.5,50,2.5S97.5,23.767,97.5,50S76.233,97.5,50,97.5z' },
                    bubbleInner: { x: -50, y: -50, fill: '#ffffff', visible: 'inherit', data: 'M72.846,10.525C62.055,4.126,51.13,3.281,47.973,8.603c-2.775,4.68-0.039,6.486,13.441,11.258 c2.085,0.738,6.515,3.302,7.67,4.403c9.226,8.799,14.219,12.486,17.375,7.165S83.637,16.925,72.846,10.525z M83.979,29.958 c-2.36,3.979-7.678-5.271-16.764-10.66c-9.087-5.389-19.121-5.245-16.762-9.224c2.36-3.979,12.029-2.788,21.116,2.602 C80.656,18.065,86.339,25.979,83.979,29.958z' }
                },
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

                    // update Konva elements
                    if (this.waterTank) {
                        this.waterTank.y = this.percentToStageHeightConverter(this.model.waterLevel);
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
