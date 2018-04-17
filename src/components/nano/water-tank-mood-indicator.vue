<template>
    <figure ref="stageContainer" class="tank-container">
        <v-stage ref="stage" :config="stageConfig">
            <v-layer ref="waterLayer">
                <v-group ref="waterTank">
                    <v-line :config="frontWaterLineConfig"></v-line>
                    <v-line :config="backWaterLineConfig"></v-line>
                </v-group>
            </v-layer>
            <v-layer ref="bubblesLayer"></v-layer>
            <v-layer ref="moodLayer">
                <v-group ref="moodEmojiIndicator"></v-group>
            </v-layer>
        </v-stage>
    </figure>
</template>

<script>
    import EmojiHelpers from '@/utils/emoji-helpers';
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
                    waterLevel: 0,
                    moodLevel: 0.5,
                    moodEmojiIndex: EmojiHelpers.emojiDataArray.findIndex(item => (item.index === null))
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
                moodIndicatorAmplitude: 18,
                moodIndicatorSwayThreshold: 1,
                moodEmojisCollection: [],
                moodEmojisWingURL: '/static/img/svg/wings.svg',
                tweenersCollection: [],
                animationsCollection: [],
                waterLineBaseOptions: { points: [], fill: '#ffffff', bezier: true, tension: 0.35, closed: true, name: 'waterline' },
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
            },
            moodState() {
                let result;
                if (this.model.waterLevel === this.model.moodLevel) {
                    result = 'float';
                    this.moodIndicatorFadeWings(false);
                } else if (this.model.waterLevel < this.model.moodLevel) {
                    result = 'fly';
                    this.moodIndicatorFadeWings(true);
                } else if (this.model.waterLevel > this.model.moodLevel) {
                    result = 'underwater';
                    this.moodIndicatorFadeWings(false);
                }

                return result;
            }
        },
        watch: {
            weekMood: {
                handler: function(val) {
                    // keep final state change
                    this.model.waterLevel = this.propToPercentConverter(val);

                    // animate water level change (when mounted)
                    const waterTankRef = this.$refs.waterTank;
                    if (waterTankRef) {
                        const tweenTank = new Konva.Tween({
                            node: waterTankRef.getStage(),
                            duration: this.verticalLevelUpdateDuration,
                            easing: Konva.Easings.ElasticEaseInOut,
                            y: this.percentToStageHeightConverter(this.model.waterLevel), // diff only
                            onFinish: function() { this.destroy() }
                        }).play();
                        this.tweenersCollection.push(tweenTank);
                    }
                },
                immediate: true
            },
            todayMood: {
                handler: function(val) {
                    // keep final state change
                    this.model.moodLevel = this.propToPercentConverter(val);
                    this.model.moodEmojiIndex = this.propToEmojiIndexConverter(val);
                    this.moodIndicatorFadeMoods(this.model.moodEmojiIndex);

                    // animate mood level change (when mounted)
                    const moodEmojiIndicator = this.$refs.moodEmojiIndicator;
                    if (moodEmojiIndicator) {
                        const tweenMoodIndicator = new Konva.Tween({
                            node: moodEmojiIndicator.getStage(),
                            duration: this.verticalLevelUpdateDuration,
                            easing: Konva.Easings.ElasticEaseInOut,
                            y: this.percentToStageHeightConverter(this.model.waterLevel), // diff only
                            onFinish: function() { this.destroy() }
                        }).play();
                        this.tweenersCollection.push(tweenMoodIndicator);
                    }
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
            moodEmojiIndicatorBuilder(groupHolder) {
                // generate wings
                const pWings = new Promise(resolve => {
                    const emojiWingsImage = new Image();
                    emojiWingsImage.onload = () => resolve({ path: this.moodEmojisWingURL, status: 'ok', image: emojiWingsImage });
                    emojiWingsImage.onerror = () => resolve({ path: this.moodEmojisWingURL, status: 'fail', image: emojiWingsImage });
                    emojiWingsImage.src = this.moodEmojisWingURL;
                });

                // generate emoji image collection (only matching index is visible)
                const pImagesArray = EmojiHelpers.emojiDataArray
                    .map(emojiData => `/static/img/smileys/${emojiData.image}`)
                    .map((emojiURL, index) => {
                        return new Promise(resolve => {
                            const moodImage = new Image();
                            moodImage.onload = () => resolve({ path: emojiURL, status: 'ok', image: moodImage });
                            moodImage.onerror = () => resolve({ path: emojiURL, status: 'fail', image: moodImage });
                            moodImage.src = emojiURL;
                        });
                    });

                // handle when all images have been loaded (wings then emojis)
                pWings.then(wingImageResp => {
                    // wings
                    groupHolder.add(new Konva.Image(Object.assign({}, this.moodEmojiWingsBaseOptions, {
                        visible: false,
                        image: wingImageResp.image
                    })));

                    // emojis
                    Promise.all(pImagesArray).then(responses => {
                        // assign images to collection
                        this.moodEmojisCollection = responses.map((resp, index) => {
                            return new Konva.Image(Object.assign({}, this.moodEmojiBaseOptions, {
                                visible: (this.model.moodEmojiIndex === index),
                                image: resp.image
                            }));
                        });
                        // add images to group then add to layer ... then redraw to make them appear
                        groupHolder.add(...this.moodEmojisCollection);
                        this.$refs.stage.getStage().draw();
                    });
                });
            },
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
            moodIndicatorSwayAnimationBuilder(moodIndicator, layer) {
                // this animation is always running to react to any update in state
                const anim = new Konva.Animation(frame => {
                    const currentRotation = moodIndicator.rotation();

                    // is animation stuck ? first test if underwater, then if flying, otherwise float (animate)
                    let isStuck = false;
                    if (this.moodState === 'underwater' && (Math.abs(currentRotation - this.moodIndicatorAmplitude) <= this.moodIndicatorSwayThreshold || Math.abs(currentRotation + this.moodIndicatorAmplitude) <= this.moodIndicatorSwayThreshold)) isStuck = true;
                    if (this.moodState === 'fly' && Math.abs(currentRotation) <= this.moodIndicatorSwayThreshold) isStuck = true;

                    // calculus
                    if (!isStuck) {
                        const newRotationValue = this.moodIndicatorAmplitude * Math.sin(frame.time * Math.PI / (this.frontWaterLineDuration * 1000 / 4));
                        moodIndicator.rotation(newRotationValue);
                    }
                }, layer);

                anim.start();
                this.animationsCollection.push(anim);
            },
            moodIndicatorFadeWings(isFlying) {
                console.log('TODO fade wings with cancel if not needed');
            },
            moodIndicatorFadeMoods(emojiTargetIndex) {
                console.log('TODO fade emojis with cancel if not needed');
            },
            setupCanva() {
                /** water lines waves **/
                // reset water level
                const waterTank = this.$refs.waterTank.getStage();
                waterTank.setY(this.percentToStageHeightConverter(this.model.waterLevel));
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

                /** mood indicator **/
                // reset properties
                const moodEmojiIndicator = this.$refs.moodEmojiIndicator.getStage();
                moodEmojiIndicator.setAttrs({ x: this.stageWidth / 2, y: this.percentToStageHeightConverter(this.model.moodLevel) });
                // animation (sway)
                this.moodIndicatorSwayAnimationBuilder(moodEmojiIndicator, this.$refs.moodLayer.getStage());
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
            this.$refs.moodLayer.getStage().hitGraphEnabled(false);

            // add generated bubbles to stage
            for (let i = 0; i < this.bubblesCount; i++) {
                this.bubblesCollection.push(this.bubbleBuilder());
            }
            bubblesLayer.add(...this.bubblesCollection);

            // add generated mood emoji indicator to stage
            this.moodEmojiIndicatorBuilder(this.$refs.moodEmojiIndicator.getStage());

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
