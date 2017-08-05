<template>
    <div class="mdl-card mdl-shadow--2dp profile-cards">
        <div class="mdl-card__title mdl-card--expand">
            <h3 class="mdl-card__title-text">Auckland Sky Tower<br>Auckland, New Zealand</h3>
        </div>
        <div class="mdl-card__media">
            <slot>
                <spinner></spinner>
            </slot>
        </div>
        <div class="mdl-card__supporting-text">
        The Sky Tower is an observation and telecommunications tower located in Auckland,
        New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
        in the Southern Hemisphere.
        </div>
        <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored" href="http://en.wikipedia.org/wiki/Sky_Tower_%28Auckland%29">Wikipedia entry</a>
        </div>
    </div>
</template>

<script>
    import Spinner from '@/components/nano/spinner';

    export default {
        components: {
            'spinner': Spinner
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';
    @import '../../styles/nano/_cards.scss';
</style>
