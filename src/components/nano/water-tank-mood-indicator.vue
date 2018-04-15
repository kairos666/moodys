<template>
    <figure ref="stageContainer" class="tank-container">
        <v-stage :config="stageConfig">
            <v-layer ref="waterLayer">
                <v-group ref="waterTank" :config="waterLevelConfig">
                    <v-line :config="frontWaterLineConfig"></v-line>
                    <v-line :config="backWaterLineConfig"></v-line>
                </v-group>
            </v-layer>
        </v-stage>
    </figure>
</template>

<script>
    // setup vue-konva plugin
    import Vue from 'vue';
    import VueKonva from 'vue-konva';
    import Konva from 'konva';
    Vue.use(VueKonva);

    export default {
        props: ['todayMood', 'weekMood'],
        data() {
            return {
                model: {
                    waterLevel: 0.5,
                    moodLevel: 0.5
                },
                stageWidth: 0,
                stageHeight: 0,
                verticalStageOffset: 80,
                verticalLevelUpdateDuration: 2,
                frontWaterLineDuration: 4,
                backWaterLineDuration: 1.8,
                frontWaterColor: '#2c7fbe',
                backWaterColor: '#32bafa',
                tweenersCollection: [],
                animationsCollection: [],
                waterLineBaseOptions: {
                    points: [],
                    fill: '#ffffff',
                    bezier: true,
                    tension: 0.35,
                    closed: true,
                    name: 'waterline'
                }
            };
        },
        computed: {
            stageConfig() {
                return {
                    width: this.stageWidth,
                    height: this.stageHeight
                };
            },
            waterLevelConfig() {
                return {
                    y: this.percentToStageHeightConverter(this.model.waterLevel)
                };
            },
            backWaterLineConfig() {
                return Object.assign({}, this.waterLineBaseOptions, {
                    fill: this.backWaterColor,
                    points: this.waterLineBuilder(0, 0, 2 * this.stageWidth, 15, 2, 0)
                });
            },
            frontWaterLineConfig() {
                return Object.assign({}, this.waterLineBaseOptions, {
                    fill: this.frontWaterColor,
                    points: this.waterLineBuilder(-1 * this.stageWidth, 0, 2 * this.stageWidth, 15, 2, Math.PI)
                });
            }
        },
        methods: {
            waterLineBuilder(x, y, width, amplitude, Hz, offsetRad) {
                let offset = offsetRad;
                if (!offset) offset = 0;
                let result = [];

                // point bottom left of tank to first wave point
                result.push(x);
                result.push(this.stageHeight * 2);
                result.push(x);
                result.push(y);

                for (let i = 0; i < Hz; i++) {
                    // each hz is comprised of 5 points
                    for (let j = 0; j < 5; j++) {
                        result.push(x + 0.25 * j * width / Hz + i * width / Hz);
                        result.push(y + amplitude * Math.sin(j * Math.PI / 2 + offset));
                    }
                }

                // point last wave point to bottom of tank
                result.push(x + width);
                result.push(y);
                result.push(x + width);
                result.push(this.stageHeight * 2);

                return result;
            },
            percentToStageHeightConverter(percent) {
                // convert percentage to real stage height (taking vertical margins into account)
                return this.verticalStageOffset + (1 - percent) * (this.stageHeight - 2 * this.verticalStageOffset);
            },
            waterLineTween(node, duration, direction) {
                return new Konva.Tween({
                    node: node,
                    duration: duration,
                    offsetX: direction * this.stageWidth,
                    onFinish: function() { this.reset() },
                    onReset: function() { this.play() }
                });
            },
            setupFixedAnimations() {
                /** water lines waves **/
                const waterTank = this.$refs.waterTank.getStage();
                const waterLines = waterTank.find('.waterline');
                // reset properties
                waterLines[1].setAttrs(Object.assign(this.backWaterLineConfig, { offsetX: 0 }));
                waterLines[0].setAttrs(Object.assign(this.frontWaterLineConfig, { offsetX: 0 }));
                // tweens
                this.tweenersCollection.push(
                    this.waterLineTween(waterLines[1], this.backWaterLineDuration, 1).play(),
                    this.waterLineTween(waterLines[0], this.frontWaterLineDuration, -1).play()
                );
            },
            destroyAnimations() {
                // when component is destroyed or resized
                // destroy all tweeners
                this.tweenersCollection.forEach(tweener => {
                    tweener.destroy();
                });
                // destroy all animations
                this.animationsCollection.forEach(animation => {
                    animation.stop();
                });
            },
            resizeStage() {
                this.stageWidth = this.$refs.stageContainer.offsetWidth;
                this.stageHeight = this.$refs.stageContainer.offsetHeight;
                this.destroyAnimations();
                this.$nextTick(() => {
                    this.setupFixedAnimations();
                });
            }
        },
        mounted() {
            // fine tuning for performances
            this.$refs.waterLayer.getStage().hitGraphEnabled(false);

            // setup resize behavior
            window.addEventListener('resize', this.resizeStage);
            this.resizeStage();
        },
        beforeDestroy() {
            // remove resize listener
            window.removeEventListener('resize', this.resizeStage);
            this.destroyAnimations();
        }
    };
</script>

<style scoped lang="scss">
    .tank-container { margin:0; min-height:500px; overflow:hidden; }
</style>
