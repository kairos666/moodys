<template>
    <div>
        <h1><i class="material-icons">person_add</i>Sign me up!</h1>
        <form>
            <fieldset>
                <legend>credentials</legend>
                <div class="fieldset-flexer">
                    <!-- email -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.email || hasValues.email), 'is-invalid': errors.has('email') }">
                        <input class="mdl-textfield__input" v-model="values.email" @focus="onInputFocus" @blur="onInputBlur" type="text" v-validate="'required|email'" name="email">
                        <label class="mdl-textfield__label" for="email">email</label>
                        <span class="mdl-textfield__error">{{ errors.first('email') }}</span>
                    </div>
                    <!-- password -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.password || hasValues.password), 'is-invalid': errors.has('password') }">
                        <input class="mdl-textfield__input" v-model="values.password" @focus="onInputFocus" @blur="onInputBlur" type="password" v-validate="'required|password'" name="password">
                        <label class="mdl-textfield__label" for="password">password</label>
                        <span class="mdl-textfield__error">{{ errors.first('password') }}</span>
                    </div>
                    <!-- password confirm -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused['password-confirm'] || hasValues['password-confirm']), 'is-invalid': errors.has('password-confirm') }">
                        <input class="mdl-textfield__input" v-model="values['password-confirm']" @focus="onInputFocus" @blur="onInputBlur" type="password" v-validate="{ rules: { required: true, confirmed: 'password' } }" name="password-confirm">
                        <label class="mdl-textfield__label" for="password-confirm">password confirmation</label>
                        <span class="mdl-textfield__error">{{ errors.first('password-confirm') }}</span>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>profile</legend>
                <div class="fieldset-flexer">
                    <!-- first name -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.firstname || hasValues.firstname), 'is-invalid': errors.has('firstname') }">
                        <input class="mdl-textfield__input" v-model="values.firstname" @focus="onInputFocus" @blur="onInputBlur" type="text" v-validate="'required'" name="firstname">
                        <label class="mdl-textfield__label" for="firstname">first name</label>
                        <span class="mdl-textfield__error">{{ errors.first('firstname') }}</span>
                    </div>
                    <!-- last name -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.lastname || hasValues.lastname), 'is-invalid': errors.has('lastname') }">
                        <input class="mdl-textfield__input" v-model="values.lastname" @focus="onInputFocus" @blur="onInputBlur" type="text" v-validate="'required'" name="lastname">
                        <label class="mdl-textfield__label" for="lastname">last name</label>
                        <span class="mdl-textfield__error">{{ errors.first('lastname') }}</span>
                    </div>
                    <!-- motto -->
                    <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused['famous-quote'] || hasValues['famous-quote']), 'is-invalid': errors.has('famous-quote') }">
                        <input class="mdl-textfield__input" v-model="values['famous-quote']" @focus="onInputFocus" @blur="onInputBlur" type="text" v-validate="'required'" name="famous-quote">
                        <label class="mdl-textfield__label" for="famous-quote">famous quote</label>
                        <span class="mdl-textfield__error">{{ errors.first('famous-quote') }}</span>
                    </div>
                </div>
            </fieldset>
            <div class="form-actions-toolbar">
                <button type="submit" :disabled="(!isFormValid || isWaitingReply)" @click.prevent="onSubmit()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">Sign up</button>
                <progress-bar v-if="isWaitingReply" :msg="asyncState.state"></progress-bar>
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
                values: {
                    email: '',
                    password: '',
                    'password-confirm': '',
                    firstname: '',
                    lastname: '',
                    'famous-quote': ''
                },
                focused: {
                    email: false,
                    password: false,
                    'password-confirm': false,
                    firstname: false,
                    lastname: false,
                    'famous-quote': false
                },
                isWaitingReply: false
            };
        },
        computed: {
            isFormValid() {
                // all fields required
                if (!this.fields || !this.fields.email || !this.fields.password || !this.fields['password-confirm'] || !this.fields['famous-quote'] || !this.fields.lastname || !this.fields.firstname) return false;
                if (this.fields.email.invalid || this.fields.email.invalid === null) return false;
                if (this.fields.password.invalid || this.fields.password.invalid === null) return false;
                if (this.fields['password-confirm'].invalid || this.fields['password-confirm'].invalid === null) return false;
                if (this.fields.firstname.invalid || this.fields.firstname.invalid === null) return false;
                if (this.fields.lastname.invalid || this.fields.lastname.invalid === null) return false;
                if (this.fields['famous-quote'].invalid || this.fields['famous-quote'].invalid === null) return false;
                return true;
            },
            hasValues() {
                let valuesClone = Object.assign({}, this.values);

                for (let field in valuesClone) {
                    valuesClone[field] = (valuesClone[field] !== '');
                }

                return valuesClone;
            },
            ...mapGetters({
                asyncState: 'isAsyncSignUp'
            })
        },
        watch: {
            asyncState: function(val) {
                if (val && val.isEnded && val.isSuccess) {
                    // triggered when account creation is a success
                    setTimeout(() => {
                        this.isWaitingReply = false;
                        this.$router.push('/');
                    }, 1000);
                } else if (val && val.isEnded && !val.isSuccess) {
                    // triggered when account creation is failed
                    setTimeout(() => {
                        this.isWaitingReply = false;
                    }, 3000);
                }
            }
        },
        methods: {
            onInputFocus(evt) {
                this.focused[evt.target.attributes.name.nodeValue] = true;
            },
            onInputBlur(evt) {
                this.focused[evt.target.attributes.name.nodeValue] = false;
            },
            onSubmit() {
                this.isWaitingReply = true;
                let valuesClone = Object.assign({}, this.values);
                this.$store.dispatch('signup', valuesClone);
            }
        },
        components: {
            'progress-bar': ProgressBar
        }
    };
</script>

<style scoped lang="scss">
    
</style>
