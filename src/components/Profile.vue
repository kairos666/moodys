<template>
    <div>
        <h1><img class="material-icons mdl-list__item-avatar" :src="currenUserData.avatar">My profile</h1>
        <form>
            <fieldset>
                <legend>credentials</legend>
                <div class="fieldset-flexer">
                    <!-- email -->
                    <div class="mdl-textfield mdl-textfield--floating-label is-focused">
                        <input class="mdl-textfield__input" disabled :value="$store.state.auth.currentFirebaseUser.email" type="text" name="email">
                        <label class="mdl-textfield__label" for="email">email</label>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>profile<small v-if="isFormValid"> - update profile to save changes</small></legend>
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
                <button type="submit" :disabled="(!isFormValid || isWaitingReply)" @click.prevent="onSubmit()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">update profile</button>
                <button type="button" @click.prevent="onChangePassword()" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">change password</button>
                <button type="button" @click.prevent="onChangeEmail()" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">change email</button>
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
                validations: {
                    firstname: undefined,
                    lastname: undefined,
                    motto: undefined
                },
                values: {
                    firstname: '',
                    lastname: '',
                    motto: ''
                },
                focused: {
                    firstname: false,
                    lastname: false,
                    motto: false
                },
                isWaitingReply: false
            };
        },
        computed: {
            isFormValid() {
                // at least one field is different
                if (!this.fields.motto || !this.fields.lastname || !this.fields.firstname) return false;
                if (this.fields.firstname.valid) return true;
                if (this.fields.lastname.valid) return true;
                if (this.fields.motto.valid) return true;
                return false;
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
                asyncState: 'isAsyncProfileUpdate',
                usersArray: 'usersArray'
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
                // this.isWaitingReply = true;
                // let valuesClone = Object.assign({}, this.values);
                // this.$store.dispatch('signup', valuesClone);
                console.log('TODO update profile + action & feedback');
                // update users entry
            },
            onChangePassword() {
                console.log('TODO change password + action & feedback');
                console.log(this.$store.state.auth.currentFirebaseUser.updatePassword);
                // https://firebase.google.com/docs/reference/js/firebase.User#updatePassword
            },
            onChangeEmail() {
                // this.isWaitingReply = true;
                this.$store.dispatch('accountEmailUpdate');
            }
        },
        components: {
            'progress-bar': ProgressBar
        },
        created() {
            // set initial values
            this.values.firstname = this.currenUserData.firstname;
            this.values.lastname = this.currenUserData.lastname;
            this.values.motto = this.currenUserData.motto;

            // set different from initial values validators rule objects
            let buildRuleObject = (fieldName, initialValue) => { return { rules: { not_in: [initialValue] }, arg: 'values.' + fieldName } };
            this.validations.firstname = buildRuleObject('firstname', this.currenUserData.firstname);
            this.validations.lastname = buildRuleObject('lastname', this.currenUserData.lastname);
            this.validations.motto = buildRuleObject('motto', this.currenUserData.motto);
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/nano/_user-list-item.scss';
    .mdl-list__item-avatar { vertical-align:baseline; }
    legend small { font-size:.5em; line-height:80%; }
</style>
