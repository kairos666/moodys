<template>
    <flip-card :no-flip="!isAchieved">
        <div class="badge-card-side badge-card-side--front" :class="{ 'is-achieved': isAchieved }" slot="front">
            <h3>{{info.title}}</h3>
            <img :alt="`badge icon - ${info.badge.replace('-', ' ')}`" :src="`static/img/badges/${info.badge}.svg`" />
        </div>
        <div class="badge-card-side badge-card-side--back" slot="back">
            <p>{{info.description}}</p>
            <img :alt="`badge icon - ${info.badge.replace('-', ' ')}`" :src="`static/img/badges/${info.badge}.svg`" />
        </div>
    </flip-card>
</template>

<script>
    import FlipCard from '@/components/nano/flip-card';

    export default {
        props: {
            info: { type: Object, required: true },
            isAchieved: { type: Boolean, required: true }
        },
        components: {
            FlipCard
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_utils.scss';
    @import '../../styles/_include-media.scss';
    @import '../../styles/_variables.scss';

    .badge-card-side { color:#fff; padding:35px; text-align:center;
        h3 { font-size:1.8em; margin:0 0 $gutter-base; }
        p { font-size:1.2em; text-align:center; }
        img { width:100px; }
        &:not(.is-achieved) img { opacity:0.25; filter: grayscale(1); }
    }
</style>
