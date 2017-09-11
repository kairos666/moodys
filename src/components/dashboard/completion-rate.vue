<template>
    <figure class="completion-figure">
        <span :class="colorClass">{{completionData.completionRate}}</span>
        <figcaption><em>{{completionData.respondentNb}}/{{completionData.totalUserNb}}</em> respondents</figcaption>
    </figure>
</template>

<script>
    export default {
        props: ['completionData'],
        computed: {
            colorClass() {
                // match completion rate with color
                let moodCompletionRate = this.completionData.completionRate;
                let colorClassObject = {
                    'low-rating': false,
                    'medium-rating': false,
                    'high-rating': false
                };

                if (moodCompletionRate < 25) {
                    colorClassObject['low-rating'] = true;
                    return colorClassObject;
                } else if (moodCompletionRate < 50) {
                    colorClassObject['medium-rating'] = true;
                    return colorClassObject;
                } else {
                    colorClassObject['high-rating'] = true;
                    return colorClassObject;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    /* completion figure (percentage + details on respondents) */
    .completion-figure { margin:0; display:flex; justify-content:space-between; flex-direction:row-reverse; align-items:center;
        > span { display:block; font-size:(45/16) + 0em; line-height:1.18;
            &:after { content:'%'; font-size:.5em; }
        }
        figcaption { margin-right:$gutter-base;
            em { font-size:2em; line-height:1.18; }
        }
    }
    .low-rating { color:$low-color; }
    .medium-rating { color:$medium-color; }
    .high-rating { color:$high-color; }
</style>
