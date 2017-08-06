<template>
    <figure class="mood-figure">
        <emoji :mood="$store.getters.averageMoodObject.index"></emoji>
        <figcaption>{{$store.getters.averageMoodObject.label}}</figcaption>
    </figure>
</template>

<script>
    import Emoji from '@/components/nano/Emoji';

    export default {
        components: {
            emoji: Emoji
        }
    };
</script>

<style scoped lang="scss">
    
</style>
