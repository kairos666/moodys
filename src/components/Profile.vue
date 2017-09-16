<template>
    <div>
        <h1><img class="material-icons mdl-list__item-avatar" :src="currenUserData.avatar">My profile</h1>
        <form>
            <fieldset>
                <legend>profile<small v-if="isProfileFormValid"> - update profile to save changes</small></legend>
                <div class="fieldset-flexer">
                    <!-- first name -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.firstname || hasValues.firstname) }">
                        <input class="mdl-textfield__input" v-model="values.firstname" @focus="onInputFocus" @blur="onInputBlur" v-validate="validations.firstname" type="text" name="firstname">
                        <label class="mdl-textfield__label" for="firstname">first name</label>
                    </div>
                    <!-- last name -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.lastname || hasValues.lastname) }">
                        <input class="mdl-textfield__input" v-model="values.lastname" @focus="onInputFocus" @blur="onInputBlur" v-validate="validations.lastname" type="text" name="lastname">
                        <label class="mdl-textfield__label" for="lastname">last name</label>
                    </div>
                    <!-- motto -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.motto || hasValues.motto) }">
                        <input class="mdl-textfield__input" v-model="values.motto" @focus="onInputFocus" @blur="onInputBlur" v-validate="validations.motto" type="text" name="motto">
                        <label class="mdl-textfield__label" for="motto">famous quote</label>
                    </div>
                </div>
            </fieldset>
            <div class="form-actions-toolbar">
                <button type="submit" :disabled="(!isProfileFormValid || isWaitingReply.profile)" @click.prevent="onSubmitProfileUpdate()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">update profile</button>
                <progress-bar v-if="isWaitingReply.profile" :msg="asyncProfileState.state"></progress-bar>
            </div>
        </form>
        <form>
            <fieldset>
                <legend>profile email ID<small v-if="isEmailFormValid"> - confirmation email will be sent</small></legend>
                <p><a class="moodys-link" href="https://gravatar.com" target="_blank" title="gravatar web site">Gravatar profile picture</a> is based on this email. If no gravatar picture is found a default profile picture is generated.</p>
                <div class="fieldset-flexer">
                    <!-- email -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.email || hasValues.email), 'is-invalid': errors.has('email') }">
                        <input class="mdl-textfield__input" v-model="values.email" @focus="onInputFocus" @blur="onInputBlur" type="text" v-validate="validations.email" name="email">
                        <label class="mdl-textfield__label" for="email">email</label>
                        <span class="mdl-textfield__error">{{ errors.first('email') }}</span>
                    </div>
                </div>
            </fieldset>
            <div class="form-actions-toolbar">
                <button type="submit" :disabled="(!isEmailFormValid || isWaitingReply.email)" @click.prevent="onSubmitEmailUpdate()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">update email</button>
                <progress-bar v-if="isWaitingReply.email" :msg="asyncEmailState.state"></progress-bar>
            </div>
        </form>
        <form>
            <fieldset>
                <legend>profile password<small v-if="isPasswordFormValid"> - confirmation email will be sent</small></legend>
                <div class="fieldset-flexer">
                    <!-- password -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.password || hasValues.password), 'is-invalid': errors.has('password') }">
                        <input class="mdl-textfield__input" v-model="values.password" @focus="onInputFocus" @blur="onInputBlur" type="password" v-validate="validations.password" name="password">
                        <label class="mdl-textfield__label" for="password">password</label>
                        <span class="mdl-textfield__error">{{ errors.first('password') }}</span>
                    </div>
                    <!-- password confirm -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.passwordConfirm || hasValues.passwordConfirm), 'is-invalid': errors.has('passwordConfirm') }">
                        <input class="mdl-textfield__input" v-model="values.passwordConfirm" @focus="onInputFocus" @blur="onInputBlur" type="password" v-validate="validations.passwordConfirm" name="passwordConfirm">
                        <label class="mdl-textfield__label" for="password-confirm">password confirmation</label>
                        <span class="mdl-textfield__error">{{ errors.first('password-confirm') }}</span>
                    </div>
                </div>
            </fieldset>
            <div class="form-actions-toolbar">
                <button type="submit" :disabled="(!isPasswordFormValid || isWaitingReply.password)" @click.prevent="onSubmitPasswordUpdate()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">update password</button>
                <progress-bar v-if="isWaitingReply.password" :msg="asyncPasswordState.state"></progress-bar>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProgressBar from '@/components/nano/progress-bar';

    export default {
        data() {
            return {
                validations: {
                    email: undefined,
                    password: undefined,
                    passwordConfirm: undefined,
                    firstname: undefined,
                    lastname: undefined,
                    motto: undefined
                },
                values: {
                    email: '',
                    password: '',
                    passwordConfirm: '',
                    firstname: '',
                    lastname: '',
                    motto: ''
                },
                focused: {
                    email: false,
                    password: false,
                    passwordConfirm: false,
                    firstname: false,
                    lastname: false,
                    motto: false
                },
                isWaitingReply: {
                    profile: false,
                    email: false,
                    password: false
                }
            };
        },
        computed: {
            isProfileFormValid() {
                // at least one field is different
                if (!this.fields || !this.fields.motto || !this.fields.lastname || !this.fields.firstname) return false;
                if (this.fields.firstname.valid) return true;
                if (this.fields.lastname.valid) return true;
                if (this.fields.motto.valid) return true;
                return false;
            },
            isEmailFormValid() {
                // valid email and different from current registered one
                if (!this.fields || !this.fields.email) return false;
                if (this.fields.email.invalid || this.fields.email.invalid === null) return false;
                return true;
            },
            isPasswordFormValid() {
                // password and confirmation must match
                if (!this.fields || !this.fields.password || !this.fields.passwordConfirm) return false;
                if (this.fields.password.invalid || this.fields.password.invalid === null) return false;
                if (this.fields.passwordConfirm.invalid || this.fields.passwordConfirm.invalid === null) return false;
                return true;
            },
            hasValues() {
                let valuesClone = Object.assign({}, this.values);

                for (let field in valuesClone) {
                    valuesClone[field] = (valuesClone[field] !== '');
                }

                return valuesClone;
            },
            currenUserData() {
                return this.usersArray.find(user => user.isCurrentUser);
            },
            ...mapGetters({
                asyncProfileState: 'isAsyncProfileUpdate',
                asyncEmailState: 'isAsyncAccountEmailUpdate',
                asyncPasswordState: 'isAsyncAccountPasswordUpdate',
                usersArray: 'usersArray'
            })
        },
        watch: {
            asyncProfileState: function(val) { this.asyncStateHandler('profile', val) },
            asyncEmailState: function(val) { this.asyncStateHandler('email', val) },
            asyncPasswordState: function(val) { this.asyncStateHandler('password', val) }
        },
        methods: {
            asyncStateHandler(type, val) {
                if (val && val.isEnded && val.isSuccess) {
                    // triggered when success
                    setTimeout(() => {
                        this.isWaitingReply[type] = false;
                        if (type === 'email' || type === 'password') this.$store.dispatch('logout');
                    }, 1000);
                } else if (val && val.isEnded && !val.isSuccess) {
                    // triggered when failed
                    setTimeout(() => {
                        this.isWaitingReply[type] = false;
                    }, 3000);
                }
            },
            onInputFocus(evt) {
                this.focused[evt.target.attributes.name.nodeValue] = true;
            },
            onInputBlur(evt) {
                this.focused[evt.target.attributes.name.nodeValue] = false;
            },
            onSubmitProfileUpdate() {
                this.isWaitingReply.profile = true;
                let valuesClone = {
                    firstname: this.values.firstname,
                    lastname: this.values.lastname,
                    motto: this.values.motto
                };
                this.$store.dispatch('accountProfileUpdate', valuesClone);
            },
            onSubmitPasswordUpdate() {
                this.isWaitingReply.password = true;
                this.$store.dispatch('accountPasswordUpdate', { password: this.values.password });
            },
            onSubmitEmailUpdate() {
                this.isWaitingReply.email = true;
                this.$store.dispatch('accountEmailUpdate', { email: this.values.email });
            }
        },
        components: {
            'progress-bar': ProgressBar
        },
        created() {
            // set initial values
            this.values.email = this.$store.state.auth.currentFirebaseUser.email;
            this.values.firstname = this.currenUserData.firstname;
            this.values.lastname = this.currenUserData.lastname;
            this.values.motto = this.currenUserData.motto;

            // set different from initial values validators rule objects
            let buildRuleObject = (fieldName, initialValue) => { return { rules: { not_in: [initialValue] }, arg: 'values.' + fieldName } };
            this.validations.firstname = buildRuleObject('firstname', this.currenUserData.firstname);
            this.validations.lastname = buildRuleObject('lastname', this.currenUserData.lastname);
            this.validations.motto = buildRuleObject('motto', this.currenUserData.motto);

            this.validations.email = {
                rules: {
                    required: true,
                    email: true,
                    not_in: [this.$store.state.auth.currentFirebaseUser.email]
                },
                arg: 'values.email'
            };
            this.validations.password = {
                rules: {
                    required: true,
                    password: true
                },
                arg: 'values.password'
            };
            this.validations.passwordConfirm = {
                rules: {
                    required: true,
                    confirmed: 'password'
                },
                arg: 'values.passwordConfirm'
            };
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/nano/_user-list-item.scss';
    .mdl-list__item-avatar { vertical-align:baseline; }
    legend small { font-size:.5em; line-height:80%; }
</style>
