<template>
    <div>
        <h1><i class="material-icons">home</i>Moodies</h1>
        <section>
            <header>
                <h2>My moody profile</h2>
            </header>
            <ul class="mdl-card-holder">
                <li>
                    <home-card>
                        <span slot="header">David Maggi</span>
                        <span slot="description">Je me suis fait élargir le périmètre un truc de ouf!</span>
                        <span slot="actions">David Maggi</span>
                    </home-card>
                </li>
                <li><home-card></home-card></li>
                <li><home-card></home-card></li>
                <li><home-card></home-card></li>
            </ul>
        </section>
        <section>
            <header>
                <h2>Moods dashboard</h2>
            </header>
            <ul class="mdl-card-holder">
                <li><home-card></home-card></li>
                <li><home-card></home-card></li>
                <li><home-card></home-card></li>
                <li><home-card></home-card></li>
            </ul>
        </section>
    </div>
</template>

<script>
    import HomeCard from '@/components/nano/home-card';

    export default {
        components: {
            'home-card': HomeCard
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';
    .mdl-card-holder { list-style:none; padding-left:0; margin:-$gutter-base; display:flex; flex-wrap:wrap; justify-content:space-between;
        > li { flex:1 1 auto; padding:$gutter-base; box-sizing:border-box; }
        @include media(">tablet", "<=desktop") {
            > li { flex:1 1 50%; }
        }
        @include media(">desktop", "<=large-desktop") {
            > li { flex:1 1 (100/3)+0%; }
        }
        @include media(">large-desktop") {
            > li { flex:1 1 25%; }
        }
    }
</style>
