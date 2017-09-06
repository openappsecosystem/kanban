import React from 'react';

import { SingleDatePicker } from 'react-dates'

class SingleDatePickerWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      focused: props.autoFocus,
      date: props.initialDate
    }

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.setState({ date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    const { focused, date } = this.state;

    // autoFocus and initialDate are helper props for the example wrapper but are not
    // props on the SingleDatePicker itself and thus, have to be omitted.


    return (
      <SingleDatePicker
        id='date_input'
        date={date}
        focused={focused}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
      />
    );
  }
}

// SingleDatePickerWrapper.propTypes = propTypes;
// SingleDatePickerWrapper.defaultProps = defaultProps;

export default SingleDatePickerWrapper
