<template>
    <div>
        <water-tank-emoji-indicator
            :today-mood="mockDayMood" 
            :week-mood="mockWeekMood"
        ></water-tank-emoji-indicator>
    </div>
</template>

<script>
    import WaterTankEmojiIndicator from '@/components/nano/water-tank-emoji-indicator';

    export default {
        data() {
            return {
                mockDayMood: '0',
                mockWeekMood: '0'
            };
        },
        components: {
            WaterTankEmojiIndicator
        }
    };
</script>
