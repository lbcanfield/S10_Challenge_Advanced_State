import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../state/action-creators'

export function Quiz(props) {
     const { quiz: { question, answer_id },
          fetchQuiz,
          selectAnswer,
          postAnswer
     } = props;


     useEffect(() => {
          if (!question) { fetchQuiz() }
     }, [])


     const onAnswer = () => {
          const quiz_id = question.quiz_id;
          postAnswer({ quiz_id, answer_id })
     }

     if (question) { console.log(question.quiz_id) }
     return (
          <div id="wrapper">
               {
                    // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
                    question ? (
                         <>
                              <h2>{question.question}</h2>
                              <div id="quizAnswers">

                                   {
                                        question.answers.map(answer => (
                                             <div
                                                  key={answer.answer_id}
                                                  className={`answer${answer_id === answer.answer_id ? ' selected' : ''}`}
                                                  onClick={() => selectAnswer(answer.answer_id)}
                                             >
                                                  {answer.text}
                                                  <button>
                                                       {answer_id === answer.answer_id ? 'SELECTED' : 'Select'}
                                                  </button>
                                             </div>
                                        ))
                                   }
                              </div>

                              <button id="submitAnswerBtn" onClick={onAnswer} disabled={!answer_id}>Submit answer</button>
                         </>
                    ) : 'Loading next quiz...'
               }
          </div >
     )
}

const mapStateToProps = state => {
     return ({
          quiz: state.quiz
     })
}

export default connect(mapStateToProps,
     {
          fetchQuiz: actions.fetchQuiz,
          selectAnswer: actions.selectAnswer,
          postAnswer: actions.postAnswer
     })(Quiz);