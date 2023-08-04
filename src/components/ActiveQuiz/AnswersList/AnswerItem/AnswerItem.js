import React from 'react'
import classes from './AnswerItem.module.css'

export const AnswerItem = (props) => {
    const cls = [classes.AnswerItem];
    if (props.answerState) {
        if (props.answerState === props.correctID
            && props.isClicked
            && props.clickedID === props.answer.id) {
            cls.push(classes['success'])
        } else if (props.isClicked
            && props.answerState !== props.correctID
            && props.clickedID === props.answer.id) {
            cls.push(classes['failure'])
        }
    }
    return (

        <li
            className={cls.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    )
}
