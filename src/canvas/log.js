import React from 'react'
import {SingleDatePicker} from 'react-dates'

const Log = () => (
  <div className='log_item'>
    <div className='members'>
      <span className='members_item'></span>
    </div>
    <select>
      <option>Work</option>
      <option>Cite</option>
      <option>Consume</option>
    </select>
    <input type='number' name='Hour' min='00.00' max='100.00' step='0.1' placeholder='00.00' />
    <select className='type'>
      <option>Hour</option>
      <option>Words</option>
    </select>
    <SingleDatePicker
      date={this.state.date} // momentPropTypes.momentObj or null
      onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
      focused={this.state.focused} // PropTypes.bool
      onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
    />
  </div>
)

export default Log