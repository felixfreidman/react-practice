import React from 'react'
import classes from './ActiveQuiz.module.css'
import { AnswerList } from './AnswersList/AnswerList'

export const ActiveQuiz = (props) => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.questionIndex}.</strong>&nbsp;
                    {props.question}?
                </span>
                <small>{props.questionIndex} out of {props.quizLength}</small>
            </p>

            <AnswerList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                answerState={props.answerState}
                correctID={props.correctID}
                isClicked={props.isClicked}
                clickedID={props.clickedID}
            />
        </div>
    )
}
