import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-44967-default-rtdb.europe-west1.firebasedatabase.app/'
})