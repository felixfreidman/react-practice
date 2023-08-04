import React, { useEffect, useState } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import axios from '../../axios/axious-quiz'
import { Loader } from '../../components/UI/Loader/Loader'


export const QuizList = () => {

    const [quizList, setQuizList] = useState([]);
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        try {
            const response = await axios.get('/quizes.json');
            const data = response.data;
            const quizes = []
            console.log(data);
            Object.keys(data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Quiz ${index + 1}`
                })
            })
            console.log(quizes);
            setQuizList(quizes);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderQuizes = () => {
        return quizList.map((quiz, index) => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }


    return (
        <div className={classes.QuizList}>
            {loading
                ?
                <Loader />
                :
                <div>
                    <h1>
                        Quiz List
                    </h1>
                    <ul>
                        {
                            renderQuizes()
                        }
                    </ul>
                </div>}

        </div>
    )
}

// componentDidMount() {
//     

//     try {

//     } catch (error) {
//         console.log(error);
//     }
// }
