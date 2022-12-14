import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'



export function Form(props) {
     const { inputChange, form, postQuiz, initialFormValues, resetForm } = props
     const [formValues, setFormValues] = useState(initialFormValues)
     console.log(form);

     const onChange = ({ target: { name, value } }) => {
          inputChange({ name, value })
     }

     const onSubmit = event => {
          event.preventDefault();
          postQuiz(form);
          // const values = actionCreators.resetForm();
          // console.log(form);
          // resetForm();

     }

     let setDisabled = true;

     if (form.newQuestion.trim().length > 1 && form.newTrueAnswer.trim().length > 1 && form.newFalseAnswer.trim().length > 1) {
          setDisabled = false;
     }
     else {
          setDisabled = true;
     }

     return (
          <form id="form" onSubmit={onSubmit} >
               <h2>Create New Quiz</h2>
               <input value={form.newQuestion} name='newQuestion' maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
               <input value={form.newTrueAnswer} name='newTrueAnswer' maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
               <input value={form.newFalseAnswer} name='newFalseAnswer' maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
               <button type='submit' disabled={setDisabled} id="submitNewQuizBtn">Submit new quiz</button>
          </form>
     )
}

const mapStateToProps = state => {
     return ({
          form: state.form,
          initialFormValues: state.initialFormState
     })
}

export default connect(mapStateToProps, actionCreators)(Form)