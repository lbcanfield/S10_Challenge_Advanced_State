import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

     const initialFormValues = {
          newQuestion: '',
          newTrueAnswer: '',
          newFalseAnswer: ''
     }

     const [formValues, setFormValues] = useState(initialFormValues);

     const inputChange = (name, value) => {
          setFormValues({
               ...formValues,
               [name]: value
          })
     }

     const onChange = event => {
          const { name, value } = event.target
          inputChange(name, value)

     }

     const onSubmit = evt => {

     }

     return (
          <form id="form" onSubmit={onSubmit}>
               <h2>Create New Quiz</h2>
               <input name='newQuestion' maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
               <input name='newTrueAnswer' maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
               <input name='newFalseAnswer' maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
               <button id="submitNewQuizBtn">Submit new quiz</button>
          </form>
     )
}

export default connect(st => st, actionCreators)(Form)
