<template>
    <div>
        <water-tank-mood-indicator
            :today-mood="mockDayMood" 
            :week-mood="mockWeekMood"
        ></water-tank-mood-indicator>
    </div>
</template>

<script>
    import WaterTankMoodIndicator from '@/components/nano/water-tank-mood-indicator';

    export default {
        data() {
            return {
                mockDayMood: '0',
                mockWeekMood: '0'
            };
        },
        components: {
            WaterTankMoodIndicator
        }
    };
</script>
