import React, { useState } from 'react'
import classes from './Auth.module.css'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'

const validateEmail = (email) => {
    const regExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return regExp.test(String(email).toLowerCase())
};

export const Auth = () => {
    const [isFormValid, setFormValidation] = useState(false);
    const [formControls, setFormControls] = useState({
        email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Input correct email',
            valid: false,
            touched: false,
            validation: {
                required: true,
                email: true
            }
        },
        password: {
            value: '',
            type: 'password',
            label: 'Password',
            errorMessage: 'Input correct password',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 6
            }
        },
    })

    const loginHandler = () => {

    }

    const signupHandler = () => {

    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    const validateControl = (value, rules) => {
        if (!rules) {
            return true
        }

        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.email) {
            isValid = validateEmail(value) && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid
    }

    const onChangeHandler = (event, controlName) => {
        const formControlsTemp = { ...formControls };
        const control = { ...formControlsTemp[controlName] }
        control.value = event.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation)
        formControlsTemp[controlName] = control;
        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        })
        setFormControls(formControlsTemp)
        setFormValidation(isFormValid)
    }

    const renderInput = () => {
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    onChange={event => onChangeHandler(event, controlName)}
                />
            )
        })
    }

    return (
        <div
            className={classes.Auth}>
            <div>
                <h1>Authorization</h1>
                <form
                    onSubmit={submitHandler}
                    className={classes.AuthForm}
                >
                    {
                        renderInput()
                    }
                    <Button
                        type="primary"
                        onClick={loginHandler}
                        disabled={!isFormValid}
                    >
                        Sign in
                    </Button>
                    <Button
                        type="primary"
                        onClick={signupHandler}
                        disabled={!isFormValid}
                    >
                        Sign up
                    </Button>
                </form>
            </div>
        </div>
    )
}

