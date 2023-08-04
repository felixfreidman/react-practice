import React, { useState } from 'react'
import classes from './QuizCreator.module.css'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { createControl, validate, validateForm } from '../../form/formFramework'
import { Auxiliary } from '../../hoc/Auxiliary/Auxiliary'
import { Select } from '../../components/UI/Select/Select'

function createOptionControl(number) {
    return createControl(
        {
            label: `Option ${number}`,
            errorMessage: 'Option input can not be empty',
            id: number
        },
        {
            required: true
        })
}

function createDefaultFormControls() {
    return {
        question: createControl({
            label: 'Add your question',
            errorMessage: 'Question can not be empty'
        }, {
            required: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),

    }
}

export const QuizCreator = () => {

    const [quiz, setQuiz] = useState([])
    const [formControls, setFormControl] = useState(createDefaultFormControls())
    const [rightAnswerId, setRightAnswer] = useState(1)
    const [isFormValid, setFormValid] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault()
    }

    const addQuestionHandler = (event) => {
        event.preventDefault();

        const quizTemp = quiz.concat();
        const index = quiz.length + 1;
        const questionItem = {
            question: formControls.question.value,
            id: index,
            rightAnswerId: rightAnswerId,
            answers: [
                { text: formControls.option1.value, id: formControls.option1.id },
                { text: formControls.option2.value, id: formControls.option2.id },
                { text: formControls.option3.value, id: formControls.option3.id },
                { text: formControls.option4.value, id: formControls.option4.id },
            ]
        }

        quizTemp.push(questionItem);
        setQuiz(quizTemp);
        setFormControl(createDefaultFormControls())
        setRightAnswer(1)
        setFormValid(false);
    }

    const createQuizHandler = (event) => {
        event.preventDefault();
        console.log(quiz);
        // TODO: Server
    }

    const changeHandler = (event, controlName) => {
        const formControlsTemp = { ...formControls };
        const control = { ...formControlsTemp[controlName] }
        control.touched = true;
        control.value = event.target.value;
        control.valid = validate(control.value, control.validationRules)
        formControlsTemp[controlName] = control;
        setFormControl(formControlsTemp)
        setFormValid(validateForm(formControlsTemp))
    }

    const changeSelectHandler = (event) => {
        setRightAnswer(+event.target.value)
    }

    const renderInputs = () => {
        return Object.keys(formControls).map((controlName, index) => {
            const controlTemp = formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={controlTemp.label}
                        value={controlTemp.value}
                        valid={controlTemp.valid}
                        shouldValidate={!!controlTemp.validationRules}
                        errorMessage={controlTemp.errorMessage}
                        touched={controlTemp.touched}
                        onChange={event => changeHandler(event, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    return (
        <div className={classes.QuizCreator}>
            <div>
                <h1>Quiz Creator</h1>
                <form
                    onSubmit={submitHandler}
                    className={classes.QuizCreatorForm}
                >
                    {renderInputs()}
                    <Select
                        label={'Choose correct answer'}
                        value={rightAnswerId}
                        onChange={changeSelectHandler}
                        options={[
                            { value: '1', text: 'Option 1' },
                            { value: '2', text: 'Option 2' },
                            { value: '3', text: 'Option 3' },
                            { value: '4', text: 'Option 4' },
                        ]}
                    ></Select>
                    <div>
                        <Button
                            type="primary"
                            onClick={addQuestionHandler}
                            disabled={!isFormValid}
                        >
                            Add Question
                        </Button>
                        <Button
                            type="primary"
                            onClick={createQuizHandler}
                            disabled={quiz.length === 0}
                        >
                            Create Quiz
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

