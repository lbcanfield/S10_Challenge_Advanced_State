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

export function inputChange() { }

export function resetForm() {
     return { type: types.RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
     return function (dispatch) {
          dispatch(resetForm)
          // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
          axios.get('http://localhost:9000/api/quiz/next')
               .then(response => {
                    // console.log(response.data)
                    dispatch(setQuiz(response.data))
               })
          // On successful GET:
          // - Dispatch an action to send the obtained quiz to its state
     }
}
export function postAnswer({ quiz_id, answer_id }) {
     return function (dispatch) {
          // On successful POST:
          axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
               .then(response => {
                    // console.log(response)
                    dispatch(setMessage(response.data.message))
               })
          dispatch(fetchQuiz())

          // - Dispatch an action to reset the selected answer state
          // - Dispatch an action to set the server message to state
          // - Dispatch the fetching of the next quiz
     }
}
export function postQuiz() {
     return function (dispatch) {
          // On successful POST:
          // - Dispatch the correct message to the the appropriate state
          // - Dispatch the resetting of the form
     }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
