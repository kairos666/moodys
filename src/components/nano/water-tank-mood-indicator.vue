<template>
    <figure ref="stageContainer" class="tank-container">
        <v-stage :config="stageConfig">
            <v-layer>
                <v-circle :config="configCircle"></v-circle>
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
                configCircle: {
                    x: 100,
                    y: 100,
                    radius: 70,
                    fill: 'red',
                    stroke: 'black',
                    strokeWidth: 4
                }
            };
        },
        computed: {
            stageConfig() {
                return {
                    width: this.stageWidth,
                    height: this.stageHeight
                };
            }
        },
        methods: {
            resizeStage() {
                this.stageWidth = this.$refs.stageContainer.offsetWidth;
                this.stageHeight = this.$refs.stageContainer.offsetHeight;
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
        }
    };
</script>

<style scoped lang="scss">
    .tank-container { margin:0; min-height:500px; }
</style>
