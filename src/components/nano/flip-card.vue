<template>
    <article class="flipper">
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
    export default {};
</script>

<style scoped lang="scss">
    @import '../../styles/_utils.scss';
    @import '../../styles/_include-media.scss';
    @import '../../styles/_variables.scss';

    .flipper { perspective:1000px; width:320px; height:480px;
        &:hover .flipper__inner-container, &.hover .flipper__inner-container { transform: rotateY(180deg); }
        .flipper__inner-container { transition:0.6s; transform-style:preserve-3d; position:relative; width:100%; height:100%; }
        .flipper__inner-container__front, .flipper__inner-container__back { width:100%; height:100%; box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.75); border-radius:2px; backface-visibility:hidden; position:absolute; top:0; left:0; }
        .flipper__inner-container__front { z-index:2; transform:rotateY(0deg); background:blue; } 
        .flipper__inner-container__back { transform:rotateY(180deg); background:green; }
    }
</style>
