import React from 'react'
import classes from './Results.module.css'
import { Button } from '../UI/Button/Button'
import { Link } from 'react-router-dom'

export const Results = (props) => {
    let correctAnswerCounter = 0
    console.log('Results', props);
    return (
        <div className={classes.Results}>
            <ul>

                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id - 1] === 'failure' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id - 1]]
                    ]

                    if (props.results[quizItem.id - 1] === 'success') {
                        correctAnswerCounter++;
                    }
                    return (
                        <li
                            key={index}
                        >
                            <strong>{index + 1}&nbsp;</strong>
                            {quizItem.question}
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                })}
            </ul>
            <p>Correct answers {correctAnswerCounter} out of {props.quiz.length}</p>
            <div>
                <Button
                    onClick={props.onRetry}
                    type='primary'
                >Retry</Button>
                <Link to={'/'}>
                    <Button
                        type='success'
                    >Go to test list</Button>
                </Link>
            </div>
        </div>
    )
}
