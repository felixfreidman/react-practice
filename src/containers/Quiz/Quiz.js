import React, { useState, useEffect } from 'react'
import classes from './Quiz.module.css'
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz'
import { Results } from '../../components/Results/Results'
import { useParams } from 'react-router-dom'
import axios from '../../axios/axious-quiz'
import { Loader } from '../../components/UI/Loader/Loader'


export const Quiz = () => {
    let { id } = useParams();
    const [clickedID, setClickedID] = useState('');
    const [results, setResults] = useState([]);
    const [isFinished, setFinished] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answerState, setAnswerState] = useState('');
    const [clicked, setClicked] = useState(false)
    const [quiz, setQuiz] = useState([])
    const [loading, setLoading] = useState([])
    async function fetchData() {
        try {
            const response = await axios.get(`quizes/${id}.json`);
            const quiz = response.data;
            console.log(quiz);
            setQuiz(quiz);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])



    const onAnswerClickHandler = (answerID) => {
        setClickedID(answerID)
        setClicked(true)
        const question = quiz[activeQuestion];
        const resultsTemp = results;
        console.log(results);

        if (answerID === question.rightAnswerId) {

            if (!resultsTemp[question.id - 1]) {
                resultsTemp[question.id - 1] = 'success';
                setAnswerState('success')
                setResults(resultsTemp)
            }

            window.setTimeout(() => {
                if (isQuizFinished()) {
                    setFinished(true)
                } else {
                    setActiveQuestion(activeQuestion + 1)
                    setAnswerState('')
                }
            }, 300)
        } else {
            resultsTemp[question.id - 1] = 'failure';
            setAnswerState('failure')
            setResults(resultsTemp)
        }
    }

    const retryHandler = () => {
        setResults(results)
        setFinished(false)
        setActiveQuestion(0)
        setAnswerState('')
        setClickedID('')
        setClicked(false)
    }

    const isQuizFinished = () => {
        return activeQuestion + 1 === quiz.length
    }
    return (
        <div className={classes.Quiz}>
            {loading
                ?
                <Loader />
                :
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
                            correctID={quiz[activeQuestion].rightAnswerId}
                            isClicked={clicked}
                            clickedID={clickedID}
                        />
                    </div>

            }
        </div>
    )

}
