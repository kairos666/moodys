<template>
    <div class="mdl-card mdl-shadow--2dp profile-cards">
        <div class="mdl-card__title mdl-card--expand">
            <div class="spinner-holder" v-if="(!hasHeader && !hasDescription && !hasActions)">
                <spinner></spinner>
            </div>
            <h3 class="mdl-card__title-text" v-if="hasHeader">
                <slot name="header"></slot>
            </h3>
        </div>
        <div class="mdl-card__supporting-text" v-if="hasDescription">
            <slot name="description"></slot>
        </div>
        <div class="mdl-card__actions mdl-card--border" v-if="hasActions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
    import Spinner from '@/components/nano/spinner';

    export default {
        data() {
            return {
                hasHeader: false,
                hasDescription: false,
                hasActions: false
            };
        },
        components: {
            'spinner': Spinner
        },
        created() {
            // init card sections display according to filled slots
            this.hasHeader = (this.$slots.header !== undefined);
            this.hasDescription = (this.$slots.description !== undefined);
            this.hasActions = (this.$slots.actions !== undefined);
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';
    @import '../../styles/nano/_cards.scss';
    .spinner-holder { text-align:center; margin-left:auto; margin-right:auto; }
</style>
