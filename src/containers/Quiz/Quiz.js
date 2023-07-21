import React, { Component } from 'react'
import classes from './Quiz.module.css'
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz'
import { Results } from '../../components/Results/Results'

export default class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'What color is the sky',
                rightAnswerID: 2,
                questionID: 1,
                answers: [
                    { text: 'Black', id: 1 },
                    { text: 'Blue', id: 2 },
                    { text: 'Red', id: 3 },
                    { text: 'Green', id: 4 },
                ],

            },
            {
                question: 'What year was Saint Petersburg founded',
                rightAnswerID: 4,
                questionID: 2,
                answers: [
                    { text: '1700', id: 1 },
                    { text: '1704', id: 2 },
                    { text: '1705', id: 3 },
                    { text: '1703', id: 4 },
                ],
            },
        ],
    }

    onAnswerClickHandler = (answerID) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }

        }
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (answerID === question.rightAnswerID) {
            if (!results[question.questionID]) {
                results[question.questionID] = 'success';
            }
            this.setState({
                answerState: {
                    [answerID]: 'success'
                },
                results
            })
            const timeOut = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    })
                }
                window.clearTimeout(timeOut);
            }, 300)
        } else {
            results[question.questionID] = 'failure';
            this.setState({
                answerState: {
                    [answerID]: 'failure'
                },
                results
            })
        }
    }

    retryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
        })
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                {
                    this.state.isFinished
                        ?
                        <Results
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        :
                        <div className={classes.QuizWrapper}>
                            <h1>Answer all the questions</h1>
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                questionIndex={this.state.activeQuestion + 1}
                                answerState={this.state.answerState}
                            />
                        </div>
                }
            </div>
        )
    }
}
