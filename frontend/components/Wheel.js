import React from 'react'
import { connect } from 'react-redux';

import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

const Wheel = (props) => {
     const { wheel, moveClockwise, moveCounterClockwise } = props;
     console.log(wheel);

     const cog = [0, 1, 2, 3, 4, 5];

     const handle_CCW_click = () => {
          console.log('counter clockwise');
          moveCounterClockwise();
     }
     const handle_CW_click = () => {
          console.log('clockwise');
          moveClockwise();
     }

     return (
          <div id="wrapper">
               <div id="wheel">
                    {
                         cog.map(pos => (
                              <div
                                   key={pos}
                                   className={`cog${pos === wheel ? ' active' : ''}`}
                                   style={{ "--i": pos }}>
                                   {pos === wheel ? "B" : null}
                              </div>
                         ))
                    }
               </div>
               <div id="keypad">
                    <button onClick={handle_CCW_click} id="counterClockwiseBtn" >Counter clockwise</button>
                    <button onClick={handle_CW_click} id="clockwiseBtn">Clockwise</button>
               </div>
          </div>
     )
}

const mapStateToProps = state => {
     return ({
          wheel: state.wheel

     })
}

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel);
