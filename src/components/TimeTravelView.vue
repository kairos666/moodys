<template>
    <div>
        <h1 class="sr-only">Time travel</h1>
        <div class="section-wrapper">
            <section class="time-scope-section">
                <header>
                    <h2><i class="material-icons">alarm</i>Time travel</h2>
                </header>
                <ul class="mdl-card-holder">
                    <li>
                        <home-card class="home-card__time-box">
                            <div slot="description">
                                <time-travel @time-range-change="onTimeRangeChange"></time-travel>
                            </div>
                        </home-card>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    import HomeCard from '@/components/nano/home-card';
    import TimeTravel from '@/components/time-travel/time-travel';

    export default {
        data() {
            return {
                timeRange: {}
            };
        },
        methods: {
            onTimeRangeChange(newValue) { this.timeRange = newValue }
        },
        components: {
            'home-card': HomeCard,
            'time-travel': TimeTravel
        }
    };
</script>

<style scope lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';

    .time-scope-section { 
        h2 { color:#fff; }
    }

    /* section level layout */
    @include media("<=large-desktop") {
        .time-scope-section {
            h2 { margin-top:0; }
        }
    }
    @include media(">large-desktop") {
        .section-wrapper { display:flex;
            > section { flex-grow:0;
                &:first-child { padding-right:$gutter-base; }
                &:last-child { padding-left:$gutter-base; }
                &.time-scope-section { flex-basis:(100/3)+0%; }
                h2 { margin-top:0; }
            }
        }
    }

    /* inner section level layout */
    .mdl-card-holder { list-style:none; padding-left:0; margin:-$gutter-base;
        > li { padding:$gutter-base; box-sizing:border-box; }
    }
    .mdl-card-holder {
        @include media(">tablet", "<=large-desktop") { display:flex; flex-wrap:wrap;
            > li { flex-grow:0; flex-basis:50%; }
        }
        .dashboard-section & {
            @include media(">large-desktop") { display:flex; flex-wrap:wrap;
                > li { flex-grow:0; flex-basis:50%; }
            }
        }
    }
</style>
