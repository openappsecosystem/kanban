import React from 'react'
import style from '../index.css'
import Button from '../../button'
import TextArea from '../../textarea'
import { Message } from '../../../icons'

export default function () {
  return (
    <div className={style.content_module}>
        <div className={style.content_log}>
            <h5><span className={style.content_icon}><Message width={20} height={20} color={'#999'}/></span>Log</h5>
            <div className={style.log_item}>
                <select>
                    <option>Work</option>
                    <option>Cite</option>
                    <option>Consume</option>
                </select>
                <input type='number' name='Hour' min='00.00' max='100.00' step='0.1' placeholder='00.00' />
                <select className={style.type}>
                    <option>Hour</option>
                    <option>Words</option>
                </select>
                {/* <SingleDatePicker
                date={date} // momentPropTypes.momentObj or null
                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                /> */}
                <TextArea placeholder={'Add a more detailed description...'} />
                <Button type={'good'} title='Update Task' />
            </div>
        </div>
    </div>
  )
}
