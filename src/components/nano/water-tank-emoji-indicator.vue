<template>
    <div class="tank-wrapper" :class="{ 'is-hidden': isHidden }">
        <figure ref="stageContainer" class="tank-container"></figure>
        <div class="tooltip tooltip-water-tank">
            <i tabindex="0" class="material-icons tooltip__icon">info_outline</i>
            <p class="tooltip__content" v-html="toolTip"></p>
        </div>
    </div>
</template>

<script>
    import Konva from 'konva';
    import WaterTankHelpers from '@/utils/water-tank-emoji-indicator-helpers';

    export default {
        props: ['todayMood', 'weekMood', 'toolTip'],
        data() {
            return {
                isHidden: false,
                model: {
                    waterLevel: 0,
                    moodLevel: 0.5
                },
                stageInstance: undefined,
                stageWidth: 0,
                stageHeight: 0,
                layerBg: undefined,
                layerMg: undefined,
                layerFg: undefined,
                waterTank: undefined,
                bubblesFountain: undefined,
                moodIndicator: undefined,
                moodScale: undefined,
                verticalStageOffset: 50,
                verticalLevelUpdateDuration: 2
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
                    if (this.moodIndicator) {
                        this.moodIndicator.state = this.moodIndicatorStateCalculator();
                    }
                },
                immediate: true
            },
            todayMood: {
                handler: function(val) {
                    // update model
                    this.model.moodLevel = this.propToPercentConverter(val);
                    const yAxisMoodLevel = this.percentToStageHeightConverter(this.model.moodLevel);

                    // update Konva elements
                    if (this.moodIndicator) {
                        this.moodIndicator.y = yAxisMoodLevel;
                        this.moodIndicator.moodScore = val;
                        this.moodIndicator.state = this.moodIndicatorStateCalculator();
                    }
                },
                immediate: true
            }
        },
        methods: {
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
            moodIndicatorStateCalculator() {
                let result;
                if (Math.abs(this.model.waterLevel - this.model.moodLevel) < 0.2) {
                    result = 'float';
                } else if (this.model.waterLevel < this.model.moodLevel) {
                    result = 'fly';
                } else if (this.model.waterLevel > this.model.moodLevel) {
                    result = 'sink';
                }

                return result;
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
                this.waterTank = new WaterTankHelpers.WaterTank(this.percentToStageHeightConverter(this.model.waterLevel), { stageWidth: this.stageWidth, stageHeight: this.stageHeight, verticalLevelUpdateDuration: this.verticalLevelUpdateDuration });
                this.layerBg.add(this.waterTank.instance);
                this.waterTank.launch();

                // attach mood scale
                this.moodScale = new WaterTankHelpers.MoodWaterScale({ stageWidth: this.stageWidth, stageHeight: this.stageHeight, verticalStageOffset: this.verticalStageOffset });
                this.layerBg.add(this.moodScale.instance);

                // attach bubbles fountain
                this.bubblesFountain = new WaterTankHelpers.BubblesFountain(this.percentToStageHeightConverter(this.model.waterLevel), { stageWidth: this.stageWidth, stageHeight: this.stageHeight });
                this.layerMg.add(this.bubblesFountain.instance);
                this.bubblesFountain.launch();

                // attach mood indicator
                this.moodIndicator = new WaterTankHelpers.MoodIndicator(this.moodIndicatorStateCalculator(), this.percentToStageHeightConverter(this.model.moodLevel), this.todayMood, { stageWidth: this.stageWidth, stageHeight: this.stageHeight });
                this.layerFg.add(this.moodIndicator.instance);
                this.moodIndicator.launch();
            },
            resizeStage() {
                // destroy stage
                this.destroyKonva();

                if (!this.$attrs['visible-scope'] || this.visibleScopeMatcher(this.$attrs['visible-scope'])) {
                    // update stage dimensions
                    this.stageWidth = this.$refs.stageContainer.offsetWidth;
                    this.stageHeight = this.$refs.stageContainer.offsetHeight;

                    // build stage
                    this.buildStage();
                }
            },
            destroyKonva() {
                // leave early if unecessary
                if (!this.stageInstance) return true;

                // destroy individual elements
                this.waterTank.destroy();
                this.waterTank = undefined;
                this.bubblesFountain.destroy();
                this.bubblesFountain = undefined;
                this.moodIndicator.destroy();
                this.moodIndicator = undefined;

                // destroy stage
                this.stageInstance.destroy();
                this.stageInstance = undefined;
            },
            visibleScopeMatcher(scope) {
                // produce side effect
                this.isHidden = !window.matchMedia(scope).matches;

                // return is a match result
                return !this.isHidden;
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
    @import '../../styles/nano/_tooltip.scss';
    .tank-wrapper { position:relative;
        &.is-hidden { display:none; }
        .tooltip { position:absolute; left:$gutter-base; bottom:$gutter-base; right:$gutter-base; }
    }
    .tank-container { margin:0; min-height:326px; overflow:hidden; }
</style>
