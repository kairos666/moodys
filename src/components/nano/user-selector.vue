<template>
    <menu class="user-selector">
        <button class="previous-btn" type="button" @click="onChange('previous')"><i class="material-icons">navigate_before</i><span class="sr-only">previous</span></button>
        <span class="current-selection">
            <profile-box :user="user"></profile-box>
        </span>
        <button class="next-btn" type="button" @click="onChange('next')"><i class="material-icons">navigate_next</i><span class="sr-only">next</span></button>
    </menu>
</template>

<script>
    import ProfileBox from '@/components/nano/profile-box';

    export default {
        props: ['user'],
        methods: {
            onChange(direction) {
                this.$emit('value-change', direction);
            }
        },
        components: {
            'profile-box': ProfileBox
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';

    .user-selector { padding-left:0; margin:0; display:flex;
        .previous-btn, .next-btn { flex:0 0 auto; }
        .current-selection { flex:1 1 auto; font-size:px2rem(17); line-height:px2rem(24); background-color:#fff; display:block; padding:$gutter-base; }
    }
    button { border:none; background-color:lighten($primary, 5%); color:#fff; padding:$gutter-base; font-size:px2rem(17); line-height:px2rem(11); cursor:pointer; outline:none; transition:color $btn-tr-duration, background-color $btn-tr-duration;
        &:focus, &:hover, &:active { background-color:$primary; }
    }
</style>
