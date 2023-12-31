export function createControl(config, validationRules) {
    return {
        ...config,
        validationRules,
        valid: !validationRules,
        touched: false,
        value: ''
    }
}

export function validate(value, validation) {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    return isValid;
}

export function validateForm(formControls) {
    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid;
    })
    return isFormValid;
}