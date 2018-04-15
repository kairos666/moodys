<template>
    <figure ref="stageContainer" class="tank-container">
        <v-stage ref="stage" :config="stageConfig">
            <v-layer ref="waterLayer">
                <v-group ref="waterTank" :config="waterLevelConfig">
                    <v-line :config="frontWaterLineConfig"></v-line>
                    <v-line :config="backWaterLineConfig"></v-line>
                </v-group>
            </v-layer>
            <v-layer ref="bubblesLayer"></v-layer>
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
                bubblesCount: 4,
                bubblesPeriod: 2000,
                bubblesAmplitude: 1 / 6,
                bubblesCollection: [],
                tweenersCollection: [],
                animationsCollection: [],
                waterLineBaseOptions: { points: [], fill: '#ffffff', bezier: true, tension: 0.35, closed: true, name: 'waterline' },
                bubbleBaseOptions: {
                    bubbleOuter: { x: -50, y: -50, fill: '#ffffff', visible: 'inherit', data: 'M50,0C22.386,0,0,22.386,0,50s22.386,50,50,50s50-22.386,50-50S77.614,0,50,0z M50,97.5 C23.767,97.5,2.5,76.233,2.5,50S23.767,2.5,50,2.5S97.5,23.767,97.5,50S76.233,97.5,50,97.5z' },
                    bubbleInner: { x: -50, y: -50, fill: '#ffffff', visible: 'inherit', data: 'M72.846,10.525C62.055,4.126,51.13,3.281,47.973,8.603c-2.775,4.68-0.039,6.486,13.441,11.258 c2.085,0.738,6.515,3.302,7.67,4.403c9.226,8.799,14.219,12.486,17.375,7.165S83.637,16.925,72.846,10.525z M83.979,29.958 c-2.36,3.979-7.678-5.271-16.764-10.66c-9.087-5.389-19.121-5.245-16.762-9.224c2.36-3.979,12.029-2.788,21.116,2.602 C80.656,18.065,86.339,25.979,83.979,29.958z' }
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
        watch: {
            weekMood: {
                handler: function(val) {
                    console.log('here: ', val, this.propToPercentConverter(val));
                    this.model.waterLevel = this.propToPercentConverter(val);
                },
                immediate: true
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
            bubbleBuilder() {
                const bubbleOuter = new Konva.Path(this.bubbleBaseOptions.bubbleOuter);
                const bubbleInner = new Konva.Path(this.bubbleBaseOptions.bubbleInner);
                const bubble = new Konva.Group();
                bubble.add(bubbleOuter, bubbleInner);

                return bubble;
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
            waterLineTween(node, duration, direction) {
                return new Konva.Tween({
                    node: node,
                    duration: duration,
                    offsetX: direction * this.stageWidth,
                    onFinish: function() { this.reset() },
                    onReset: function() { this.play() }
                });
            },
            bubblesAnimation(bubbles, layer) {
                const period = this.bubblesPeriod;
                const stageHeight = this.stageHeight;
                const xAmplitude = this.bubblesAmplitude * this.stageWidth;
                const originalBubblesProperties = bubbles.map(bubble => {
                    return { x: bubble.x(), y: bubble.y(), scale: bubble.scaleX() };
                });

                const anim = new Konva.Animation(frame => {
                    bubbles.forEach((bubble, index) => {
                        const currentWaterLevel = this.percentToStageHeightConverter(this.model.waterLevel);
                        // ondulate on X axis
                        bubble.setX(originalBubblesProperties[index].x + xAmplitude * Math.cos(frame.time * (1.5 + 0.4 * index) * Math.PI / period));
                        // regularly go up on Y axis (start over when reached slightly beneath the surface)
                        let newY = bubble.y() - (0.5 + 0.75 * index);
                        if (newY <= (currentWaterLevel + 25)) newY = originalBubblesProperties[index].y;
                        bubble.setY(newY);
                        // scale is proportional to distance to surface
                        let newScale = originalBubblesProperties[index].scale + 0.3 * (1 - Math.abs(currentWaterLevel - bubble.y()) / stageHeight);
                        bubble.scale({ x: newScale, y: newScale });
                        // opacity
                        bubble.opacity(0.4 + 0.6 * Math.abs(currentWaterLevel - bubble.y()) / stageHeight);
                    });
                }, layer);

                anim.start();
                this.animationsCollection.push(anim);
            },
            setupCanva() {
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

                /** bubbles waves **/
                // reset properties
                this.bubblesCollection.forEach(bubble => {
                    bubble.setAttrs({ x: this.stageWidth / 2, y: this.stageHeight, scaleX: 0.1, scaleY: 0.1 });
                });
                // animations
                this.bubblesAnimation(this.bubblesCollection, this.$refs.bubblesLayer.getStage());
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
                    this.setupCanva();
                });
            }
        },
        mounted() {
            // fine tuning for performances
            this.$refs.waterLayer.getStage().hitGraphEnabled(false);
            const bubblesLayer = this.$refs.bubblesLayer.getStage().hitGraphEnabled(false);

            // add generated bubbles to stage
            for (let i = 0; i < this.bubblesCount; i++) {
                this.bubblesCollection.push(this.bubbleBuilder());
            }
            bubblesLayer.add(...this.bubblesCollection);

            // setup resize behavior
            window.addEventListener('resize', this.resizeStage);
            this.resizeStage();
        },
        beforeDestroy() {
            // remove resize listener
            window.removeEventListener('resize', this.resizeStage);
            // destroy animations
            this.destroyAnimations();
            // destroy stage
            this.$refs.stage.getStage().destroy();
        }
    };
</script>

<style scoped lang="scss">
    .tank-container { margin:0; min-height:500px; overflow:hidden; }
</style>
