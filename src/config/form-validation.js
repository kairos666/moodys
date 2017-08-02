import { Validator } from 'vee-validate';

const passwordStrength = {
    getMessage(field) {
        return 'minimum six characters, at least one letter and one number';
    },
    validate(value) {
        // pattern for password: minimum six characters, at least one letter and one number
        return new Promise(resolve => {
            resolve({
                valid: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&]{6,}$/.test(value)
            });
        });
    }
};

// extend validators list
Validator.extend('password', passwordStrength);

let formValidationConfig = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fields',
    delay: 0,
    locale: 'en',
    dictionary: null,
    strict: true,
    enableAutoClasses: true,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true
};

export default formValidationConfig;
