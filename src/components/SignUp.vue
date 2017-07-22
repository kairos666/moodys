<template>
    <form>
        <h1>Sign me up!</h1>
        <fieldset>
            <legend>credentials</legend>
            <!-- email -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" v-validate="'required|email'" name="email">
                <label class="mdl-textfield__label" for="email">email</label>
            </div>
            <!-- password -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="password" v-validate="'required|password'" name="password">
                <label class="mdl-textfield__label" for="password">password</label>
                <span class="mdl-textfield__error" :class="{ 'show': isPasswordWeak }">minimum six characters, at least one letter and one number</span>
            </div>
            <!-- password confirm -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="password" v-validate="{ rules: { required: true, confirmed: 'password' } }" name="password-confirm">
                <label class="mdl-textfield__label" for="password-confirm">password confirmation</label>
            </div>
        </fieldset>
        <fieldset>
            <legend>profile</legend>
            <!-- email -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" v-validate="'required'" name="firstname">
                <label class="mdl-textfield__label" for="firstname">first name</label>
            </div>
            <!-- password -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" v-validate="'required'" name="lastname">
                <label class="mdl-textfield__label" for="lastname">last name</label>
            </div>
            <!-- password confirm -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" v-validate="'required'" name="famous-quote">
                <label class="mdl-textfield__label" for="famous-quote">famous quote</label>
            </div>
        </fieldset>
        <button type="submit" :disabled="!isFormValid" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">Sign up</button>
    </form>
</template>

<script>
    export default {
        computed: {
            isPasswordWeak() {
                return (this.fields.password && this.fields.password.dirty && this.fields.password.invalid);
            },
            isFormValid() {
                // all fields required
                if (!this.fields || !this.fields.email || !this.fields.password || !this.fields['famous-quote'] || !this.fields.lastname || !this.fields.firstname) return false;
                if (this.fields.email.invalid || this.fields.email.invalid === null) return false;
                if (this.fields.password.invalid || this.fields.password.invalid === null) return false;
                if (this.fields['password-confirm'].invalid || this.fields['password-confirm'].invalid === null) return false;
                if (this.fields.firstname.invalid || this.fields.firstname.invalid === null) return false;
                if (this.fields.lastname.invalid || this.fields.lastname.invalid === null) return false;
                if (this.fields['famous-quote'].invalid || this.fields['famous-quote'].invalid === null) return false;
                return true;
            }
        }
    };
</script>

<style scoped lang="scss">
    .mdl-textfield__error.show { visibility:visible; }
</style>
