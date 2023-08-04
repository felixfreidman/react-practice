import React from 'react'
import Layout from './hoc/Layout/Layout';
import { Route, Routes, Navigate } from 'react-router-dom'
import { Quiz } from './containers/Quiz/Quiz';
import { Auth } from './containers/Auth/Auth';
import { QuizCreator } from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList'


function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/quiz-creator' element={<QuizCreator />} />
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/' element={<QuizList />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
