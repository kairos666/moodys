<template>
    <article class="flipper" :class="{ 'is-blocked': noFlip }">
        <div class="flipper__inner-container">
            <section class="flipper__inner-container__front">
                <slot name="front"></slot>
            </section>
            <section class="flipper__inner-container__back">
                <slot name="back"></slot>
            </section>
        </div>
    </article>
</template>

<script>
    export default {
        props: {
            noFlip: Boolean
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_utils.scss';
    @import '../../styles/_include-media.scss';
    @import '../../styles/_variables.scss';

    .flipper { perspective:1000px; width:100%; height:100%;
        &:not(.is-blocked):hover .flipper__inner-container, &:not(.is-blocked).hover .flipper__inner-container { transform: rotateY(180deg); }
        .flipper__inner-container { transition:0.6s; transform-style:preserve-3d; position:relative; width:100%; height:100%; }
        .flipper__inner-container__front, .flipper__inner-container__back { width:100%; height:100%; box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.75); border-radius:2px; background-size:cover; background-repeat:no-repeat; background-image:linear-gradient(to right, rgba($project-overlay-color, .75), rgba($project-overlay-color, .75)), url('/static/img/dashboard-bg.jpg'); backface-visibility:hidden; position:absolute; top:0; left:0; }
        .flipper__inner-container__front { z-index:2; transform:rotateY(0deg); } 
        .flipper__inner-container__back { transform:rotateY(180deg); }

        /* ornament border */
        .flipper__inner-container__front:before, .flipper__inner-container__back:before { content:''; border:20px solid transparent; display:block; position:absolute; top:5px; left:5px; right:5px; bottom:5px; border-image-slice: 20 20 20 20; border-image-width: 25px 25px 25px 25px; border-image-outset: 0px 0px 0px 0px; border-image-repeat: round round; border-image-source: url("/static/img/badges/badge-card-border.svg"); }

        /* content placement */
        .flipper__inner-container__front, .flipper__inner-container__back { display:flex; flex-direction:column; justify-content:center; align-items:center; }
    }
</style>
