<template>
    <div>
        <h1><i class="material-icons">fingerprint</i>Sign in</h1>
        <button type="button" @click.prevent="signin()">sign in as David</button>
        <button type="button" @click.prevent="signout()">sign out</button>
        <button type="button" @click.prevent="signup()">sign up</button>
        <button type="button" @click.prevent="forgotPassword()">forgot password</button>
    </div>
</template>

<script>
    export default {
        methods: {
            signin(email, password) {
                this.$store.dispatch('login', { email: 'davidmaggi57@gmail.com', password: 'PackageManagerFatigue101' });
            },
            signout() {
                this.$store.dispatch('logout');
            },
            signup(email, password) {
                console.log('TODO signup');
            },
            forgotPassword() {

            }
        }
    };
</script>

<style></style>
