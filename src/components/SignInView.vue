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
                this.$store.dispatch('login', { email: 'davidmaggi57@gmail.com', password: 'PackageManagerFatigue101' });
            },
            signout() {
                this.$store.dispatch('logout');
            }
        }
    };
</script>

<style></style>
