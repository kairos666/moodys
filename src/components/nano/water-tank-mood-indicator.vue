<template>
    <figure ref="stageContainer" class="tank-container">
        <v-stage :config="stageConfig">
            <v-layer>
                <v-line :config="backWaterLineConfig"></v-line>
                <v-line :config="frontWaterLineConfig"></v-line>
            </v-layer>
        </v-stage>
    </figure>
</template>

<script>
    // setup vue-konva plugin
    import Vue from 'vue';
    import VueKonva from 'vue-konva';
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
            resizeStage() {
                this.stageWidth = this.$refs.stageContainer.offsetWidth;
                this.stageHeight = this.$refs.stageContainer.offsetHeight;
            },
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
            }
        },
        mounted() {
            // setup resize behavior
            window.addEventListener('resize', this.resizeStage);
            this.resizeStage();
        },
        beforeDestroy() {
            // remove resize listener
            window.removeEventListener('resize', this.resizeStage);
            // destroy all tweeners
            this.tweenersCollection.forEach(tweener => {
                tweener.destroy();
            });
            // destroy all animations
            this.animationsCollection.forEach(animation => {
                animation.stop();
            });
        }
    };
</script>

<style scoped lang="scss">
    .tank-container { margin:0; min-height:500px; }
</style>
