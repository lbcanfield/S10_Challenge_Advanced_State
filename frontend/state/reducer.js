// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import * as types from '../state/action-types';

const initialWheelState = 0
const wheel = (state = initialWheelState, action) => {
     switch (action.type) {
          case types.MOVE_CLOCKWISE:
               if (state === 5) {
                    return state = 0
               }
               return state = state + 1
          case types.MOVE_COUNTERCLOCKWISE:
               if (state === 0) {
                    return state = 5
               }
               return state = state - 1
          default:
               return state;
     }
}

const initialQuizState = {}
function quiz(state = initialQuizState, action) {
     switch (action.type) {
          case types.RESET_FORM:
               return initialQuizState;
          case types.SET_QUIZ_INTO_STATE:
               return { answer_id: null, question: action.payload }
          case types.SET_SELECTED_ANSWER:
               return { ...state, answer_id: action.payload }
          default:
               return state
     }

}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
     return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
     switch (action.type) {
          case types.RESET_FORM:
               return initialMessageState
          case types.SET_INFO_MESSAGE:
               return action.payload
          default:
               return state;
     }
     return state
}

const initialFormState = {
     newQuestion: '',
     newTrueAnswer: '',
     newFalseAnswer: '',
}
function form(state = initialFormState, action) {
     return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
