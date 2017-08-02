<template>
    <div>
        <h1><i class="material-icons">fingerprint</i>Reset password</h1>
        <form>
            <div class="fieldset-flexer">
                <!-- email -->
                <div class="mdl-textfield mdl-textfield--floating-label" :class="{ 'is-focused': (focused.email || hasValues.email), 'is-invalid': errors.has('email') }">
                    <input class="mdl-textfield__input" v-model="values.email" @focus="onInputFocus" @blur="onInputBlur" type="text" v-validate="'required|email'" name="email">
                    <label class="mdl-textfield__label" for="email">email</label>
                    <span class="mdl-textfield__error">{{ errors.first('email') }}</span>
                </div>
            </div>
            <div class="form-actions-toolbar">
                <button type="submit" :disabled="(!isFormValid || isWaitingReply)" @click.prevent="onSubmit()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">reset password</button>
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
                    email: ''
                },
                focused: {
                    email: false
                },
                isWaitingReply: false
            };
        },
        computed: {
            isFormValid() {
                // all fields required
                if (!this.fields || !this.fields.email) return false;
                if (this.fields.email.invalid || this.fields.email.invalid === null) return false;
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
                asyncState: 'isAsyncResetPassword'
            })
        },
        watch: {
            asyncState: function(val) {
                if (val && val.isEnded && val.isSuccess) {
                    // triggered when account sign in is a success
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
                this.$store.dispatch('resetPassword', valuesClone);
            }
        },
        components: {
            'progress-bar': ProgressBar
        }
    };
</script>

<style></style>
