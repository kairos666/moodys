<template>
    <div class="page-view page-experiments">
        <h1><i class="material-icons">all_inclusive</i>Web experiments</h1>
        <p>
            Moodys is a PWA web application. Initially the aim was to create a simplistic demo app to try out PWA features.<br>
            Given the number of current features it has now grown into a real application for tracking people moods over time.
        </p>
        <ul class="mdl-card-holder">
            <li>
                <card class="home-card__project">
                    <span slot="header">
                        Moodys UI
                    </span>
                    <span slot="description">
                        <p>pouet</p>
                    </span>
                </card>
            </li>
            <li>
                <card class="home-card__project">
                    <span slot="header">
                        Moodys UI
                    </span>
                    <span slot="description">
                        <p>pouet</p>
                    </span>
                </card>
            </li>
        </ul>
    </div>
</template>

<script>
    import HomeCard from '@/components/nano/home-card';

    export default {
        components: {
            'card': HomeCard
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';

    .mdl-card-holder { list-style:none; padding-left:0; margin:-$gutter-base;
        > li { padding:$gutter-base; box-sizing:border-box; }
    }
    .mdl-card-holder {
        @include media(">desktop") { display:flex; flex-wrap:wrap;
            > li { flex-grow:0; flex-basis:50%; }
        }
    }
    .mdl-card__actions > span { margin-top:-$gutter-base; }
    .mdl-button { margin-top:$gutter-base; }
</style>
