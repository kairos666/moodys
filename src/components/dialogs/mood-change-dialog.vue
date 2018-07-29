<template>
    <form class="mood-selector-container">
        <menu ref="stageContainer" class="dialog-box dialog-box__mood-change"></menu>
        <fieldset>
            <textarea v-model="message" rows="4" maxlength="144" placeholder="I'm feeling this way because..."></textarea>
        </fieldset>
    </form>
</template>

<script>
    import Konva from 'konva';
    import MoodMenuHelpers from '@/utils/mood-menu-helpers';
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                stageInstance: undefined,
                stageWidth: 0,
                stageHeight: 0,
                layerBg: undefined,
                layerFg: undefined,
                mainSelection: undefined,
                selectors: undefined,
                message: ''
            };
        },
        computed: {
            ...mapGetters({
                currentMood: 'currentUserMood'
            })
        },
        methods: {
            onClose() {
                this.$emit('close-dialog');
            },
            processTwoot(moodValue) {
                // exit without sending twoot when no message has been typed
                if (this.message === '') return;
                const twoot = { body: this.message, mood: moodValue };
                this.$store.dispatch('posts/addPost', twoot);
            },
            onMoodSelection(moodValue) {
                // update model only if mood has been changed to a different value
                if (this.mainSelection.currentMood !== moodValue) {
                    this.$store.dispatch('updateCurrentUserMood', moodValue);

                    // send twoot along with new mood value
                    this.processTwoot(moodValue);

                    // menu update orchestration - update mood | hide selectors | close dialog box (prevented if clicked the same mood)
                    this.mainSelection.currentMood = moodValue;
                    if (this.selectors) this.selectors.hide();
                    setTimeout(this.onClose, 1000 * (MoodMenuHelpers.genericProperties.delay + MoodMenuHelpers.genericProperties.selectorsTweenDuration));
                }
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
                this.mainSelection = new MoodMenuHelpers.MainSelection({ currentMood: this.currentMood, stageWidth: this.stageWidth, stageHeight: this.stageHeight });
                this.layerFg.add(this.mainSelection.instance);
                this.mainSelection.launch();

                // attach all individual selectors - and listen to events
                this.selectors = new MoodMenuHelpers.Selectors({ stageWidth: this.stageWidth, stageHeight: this.stageHeight }, this.onMoodSelection);
                this.layerBg.add(this.selectors.instance);
                this.selectors.launch();

                // find best suitable scale and apply
                const targetScale = MoodMenuHelpers.scaleCalculator(
                    [this.mainSelection.size, this.selectors.size],
                    this.stageWidth,
                    this.stageHeight
                );
                this.mainSelection.scale = targetScale;
                this.selectors.scale = targetScale;

                this.stageInstance.draw();
            }
        },
        mounted() {
            // calculate stage size for the first time
            this.resizeStage();

            // setup resize behavior
            window.addEventListener('resize', this.resizeStage);

            // show menu animation
            if (this.selectors) this.selectors.show();
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

    /* aligned with dialog-box styles */
    .mood-selector-container fieldset { position:absolute; top:50%; left:50%; transform:translateX(-50%); box-sizing:border-box; background-color:#fff; margin:$gutter-base 0 0; border-radius:20px; border:3px solid #fff; padding:$gutter-base;
        background: no-repeat #fff center center url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjUxMi4wMDJweCIgaGVpZ2h0PSI1MTIuMDAycHgiIHZpZXdCb3g9IjAgMCA1MTIuMDAyIDUxMi4wMDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMi4wMDIgNTEyLjAwMjsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTUxMi4wMDIsOTcuMjExYy0xOC44NCw4LjM1NC0zOS4wODIsMTQuMDAxLTYwLjMzLDE2LjU0YzIxLjY4Ni0xMywzOC4zNDItMzMuNTg1LDQ2LjE4Ni01OC4xMTUNCgkJYy0yMC4yOTksMTIuMDM5LTQyLjc3NywyMC43OC02Ni43MDUsMjUuNDljLTE5LjE2LTIwLjQxNS00Ni40NjEtMzMuMTctNzYuNjc0LTMzLjE3Yy01OC4wMTEsMC0xMDUuMDQyLDQ3LjAyOS0xMDUuMDQyLDEwNS4wMzkNCgkJYzAsOC4yMzMsMC45MjksMTYuMjUsMi43MiwyMy45MzljLTg3LjMtNC4zODItMTY0LjcwMS00Ni4yLTIxNi41MDktMTA5Ljc1M2MtOS4wNDIsMTUuNTE0LTE0LjIyMywzMy41NTgtMTQuMjIzLDUyLjgwOQ0KCQljMCwzNi40NDQsMTguNTQ0LDY4LjU5Niw0Ni43Myw4Ny40MzNjLTE3LjIxOS0wLjU0Ni0zMy40MTYtNS4yNzEtNDcuNTc3LTEzLjEzOWMtMC4wMSwwLjQzOC0wLjAxLDAuODc4LTAuMDEsMS4zMjENCgkJYzAsNTAuODk0LDM2LjIwOSw5My4zNDgsODQuMjYxLDEwM2MtOC44MTMsMi4zOTktMTguMDk0LDMuNjg3LTI3LjY3NCwzLjY4N2MtNi43NjksMC0xMy4zNDktMC42Ni0xOS43NjQtMS44ODgNCgkJYzEzLjM2OCw0MS43Myw1Mi4xNiw3Mi4xMDQsOTguMTI2LDcyLjk0OWMtMzUuOTUsMjguMTc2LTgxLjI0Myw0NC45NjctMTMwLjQ1OCw0NC45NjdjLTguNDc5LDAtMTYuODQtMC40OTYtMjUuMDU4LTEuNDcxDQoJCWM0Ni40ODYsMjkuODA3LDEwMS43MDEsNDcuMTk3LDE2MS4wMjEsNDcuMTk3YzE5My4yMTEsMCwyOTguODY4LTE2MC4wNjIsMjk4Ljg2OC0yOTguODcyYzAtNC41NTQtMC4xMDQtOS4wODQtMC4zMDUtMTMuNTkNCgkJQzQ4MC4xMTEsMTM2Ljc3NSw0OTcuOTIsMTE4LjI3NSw1MTIuMDAyLDk3LjIxMXoiLz4NCjwvZz4NCjwvc3ZnPg0K');
        background-size: 40px;
        &:after, &:before { content:''; width:0; height:0; border-style:solid; border-width:0 20px $gutter-base 20px; border-color: transparent transparent #fff transparent; position:absolute; top:-$gutter-base; left:50%; transform:translateX(-50%); }
        &:before { top:(-$gutter-base - 3px); }
        &:focus-within { border-color:$primary;
            &:before { border-bottom-color:$primary; }
        }
        textarea { font-size:1.2rem; line-height:1.3; font-family:"Roboto","Helvetica","Arial",sans-serif; width:100%; resize:none; border:none; padding:0; outline:none; background-color:rgba(#fff, .9); }
        @include media('<tablet') { 
            width:70vw; top:calc(80vh - 60px);
        }
        @include media('>=tablet', '<desktop') {
            width:35vw; top:calc(50% + 25vh);
        }
        @include media('>=desktop') {
            width:30vw; top:calc(50% + 25vh);
        }
    }
</style>
