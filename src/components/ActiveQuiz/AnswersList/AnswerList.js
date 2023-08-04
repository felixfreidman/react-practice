import React from 'react'
import { AnswerItem } from './AnswerItem/AnswerItem'
import classes from './AnswerList.module.css'
export const AnswerList = (props) => {
    return (
        <ul className={classes.AnswerList}>
            {props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        answer={answer}
                        key={index}
                        onAnswerClick={props.onAnswerClick}
                        answerState={props.answerState ? answer.id : null}
                        correctID={props.correctID}
                        isClicked={props.isClicked}
                        clickedID={props.clickedID}
                    />
                )
            })}
        </ul>
    )
}
