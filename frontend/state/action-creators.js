// ❗ You don't need to add extra action creators to achieve MVP
import * as types from "./action-types"
import axios from 'axios';

export const moveClockwise = () => {
     return { type: types.MOVE_CLOCKWISE };
}

export const moveCounterClockwise = () => {
     return { type: types.MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answer_id) {
     console.log(answer_id);
     const payload = answer_id;
     return { type: types.SET_SELECTED_ANSWER, payload }
}

export function setMessage(message) {
     const payload = message;
     return { type: types.SET_INFO_MESSAGE, payload }
}

export function setQuiz(quiz) {
     const payload = quiz;
     // console.log(quiz);
     return { type: types.SET_QUIZ_INTO_STATE, payload }
}

export function inputChange({ name, value }) {
     const payload = { name, value }
     return { type: types.INPUT_CHANGE, payload }
}

export function resetForm() {
     return { type: types.RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
     return function (dispatch) {
          dispatch(resetForm)
          axios.get('http://localhost:9000/api/quiz/next')
               .then(response => {
                    console.log(response.data)
                    dispatch(setQuiz(response.data))
               })
     }
}
export function postAnswer({ quiz_id, answer_id }) {
     return function (dispatch) {
          // On successful POST:
          axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
               .then(response => {
                    const successMessage = response.data.message
                    dispatch(setMessage(successMessage))
                    dispatch(fetchQuiz())
               })
     }

}
export function postQuiz(data) {
     const question = {
          question_text: data.newQuestion,
          true_answer_text: data.newTrueAnswer,
          false_answer_text: data.newFalseAnswer
     }
     return function (dispatch) {
          // On successful POST:
          axios.post('http://localhost:9000/api/quiz/new', question)
               .then(response => {
                    // console.log(response.data);
                    const sMsg = response.data.question;
                    dispatch(setMessage(`Congrats: "${sMsg}" is a great question!`))
                    dispatch(resetForm())


               })

               // .catch(error)
               .finally()

     }
}
   // ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
