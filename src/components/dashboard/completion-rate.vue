<template>
    <figure class="completion-figure">
        <span :class="colorClass">{{$store.getters.todayCompletionObject.completionRate}}</span>
        <figcaption>{{$store.getters.todayCompletionObject.respondentNb}}/{{$store.getters.todayCompletionObject.totalUserNb}} respondents</figcaption>
    </figure>
</template>

<script>
    export default {
        computed: {
            colorClass() {
                // match completion rate with color
                let moodCompletionRate = this.$store.getters.todayCompletionObject.completionRate;
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
    .low-rating { color:$low-color; }
    .medium-rating { color:$medium-color; }
    .high-rating { color:$high-color; }
</style>
