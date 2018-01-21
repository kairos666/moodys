<template>
    <flip-card>
        <div class="badge-card-side badge-card-side--front" slot="front">
            <h3>{{info.title}}</h3>
        </div>
        <div class="badge-card-side badge-card-side--back" slot="back">
            <p>{{info.description}}</p>
        </div>
    </flip-card>
</template>

<script>
    import FlipCard from '@/components/nano/flip-card';

    export default {
        props: {
            info: { type: Object, required: true }
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

    .badge-card-side { color:#fff; padding:35px; 
        h3 { font-size:1.8em; margin:0 0 $gutter-base; text-align:center; }
        p { font-size:1.2em; text-align:center; }
    }
</style>
