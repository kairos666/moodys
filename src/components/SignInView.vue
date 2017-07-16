<template>
    <div>
        <h1>Sign in</h1>
        <button type="button" @click.prevent="signin()">sign in as David</button>
        <button type="button" @click.prevent="signout()">sign out</button>
    </div>
</template>

<script>
    export default {
        methods: {
            signin() {
                console.log(this.$root.$firebaseActions);
                this.$root.$firebaseActions.authenticate('davidmaggi57@gmail.com', 'PackageManagerFatigue101');
            },
            signout() {
                this.$root.$firebaseActions.signOut();
            }
        }
    };
</script>

<style></style>
