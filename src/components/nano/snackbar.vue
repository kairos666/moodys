<template>
    <aside v-if="isSnackbarShown">{{snackbarContent}}</aside>
</template>

<script>
    import { mapState } from 'vuex';

    // react to all changes in snackable data
    export default {
        data() {
            return {
                isSnackbarShown: false,
                snackbarContent: ''
            };
        },
        computed: {
            ...mapState('offline/', {
                isDBOnline: 'isDBOnline'
            })
        },
        methods: {
            showSnackBar(content) {
                // show
                this.snackbarContent = content;
                this.isSnackbarShown = true;

                // timed hiding
                setTimeout(() => {
                    this.isSnackbarShown = false;
                    this.snackbarContent = '';
                }, 1500);
            }
        },
        watch: {
            isDBOnline(val) {
                if (val) {
                    // connected to DB
                    this.showSnackBar('database connected');
                } else {
                    // disconnected from DB
                    this.showSnackBar('database disconnected');
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_utils.scss';
    aside { position:fixed; z-index:666; border-radius:2px; right:$gutter-base; bottom:$gutter-base; padding:$gutter-base; background-color:$snack-bar-bg; color:#fff; }
</style>
