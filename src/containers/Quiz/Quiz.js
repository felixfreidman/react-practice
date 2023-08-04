import React, { useState } from 'react'
import classes from './Quiz.module.css'
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz'
import { Results } from '../../components/Results/Results'
import { useParams } from 'react-router-dom'


export const Quiz = () => {
    let { id } = useParams();
    const [clickedID, setClickedID] = useState('');
    const [results, setResults] = useState([]);
    const [isFinished, setFinished] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answerState, setAnswerState] = useState('');
    const [clicked, setClicked] = useState(false)
    const [quiz, setQuiz] = useState([
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
    ])
    console.log(`/quiz/${id}`);



    const onAnswerClickHandler = (answerID) => {
        // console.log(answerState);
        // if (answerState) {
        //     const key = Object.keys(answerState)[0]
        //     console.log(key);
        //     if (answerState[key] === 'success') {
        //         return
        //     }

        // }
        setClickedID(answerID)
        setClicked(true)
        const question = quiz[activeQuestion];
        const resultsTemp = results;

        if (answerID === question.rightAnswerID) {

            if (!resultsTemp[question.questionID]) {
                resultsTemp[question.questionID] = 'success';
                setAnswerState('success')
                setResults(resultsTemp)
            }

            window.setTimeout(() => {
                if (isQuizFinished()) {
                    setFinished(true)
                } else {
                    setActiveQuestion(activeQuestion + 1)
                    setAnswerState(null)
                }
            }, 300)
        } else {
            resultsTemp[question.questionID] = 'failure';
            setAnswerState('failure')
            setResults(resultsTemp)
        }
    }

    const retryHandler = () => {
        setResults(results)
        setFinished(false)
        setActiveQuestion(0)
        setAnswerState(null)
        setClickedID('')
        setClicked(false)
    }

    const isQuizFinished = () => {
        return activeQuestion + 1 === quiz.length
    }
    return (
        <div className={classes.Quiz}>
            {
                isFinished
                    ?
                    <Results
                        results={results}
                        quiz={quiz}
                        onRetry={retryHandler}
                    />
                    :
                    <div className={classes.QuizWrapper}>
                        <h1>Answer all the questions</h1>
                        <ActiveQuiz
                            answers={quiz[activeQuestion].answers}
                            question={quiz[activeQuestion].question}
                            onAnswerClick={onAnswerClickHandler}
                            quizLength={quiz.length}
                            questionIndex={activeQuestion + 1}
                            answerState={answerState}
                            correctID={quiz[activeQuestion].rightAnswerID}
                            isClicked={clicked}
                            clickedID={clickedID}
                        />
                    </div>

            }
        </div>
    )

}
