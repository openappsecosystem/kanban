import React from 'react'
import style from '../index.css'
import Button from '../../button'
import TextArea from '../../textarea'
import { Message } from '../../../icons'

export default function LogEvent ({units, commitmentId, scopeId, log, note, addNote, addAction, addNumericValue, addUnitId}) {
  return (
    <div className={style.content_module}>
        <div className={style.content_log}>
            <h5><span className={style.content_icon}><Message width={20} height={20} color={'#999'}/></span>Log</h5>
            <div className={style.log_item}>
                <select onChange={addAction}>
                    <option value='work'>Work</option>
                    {/* <option value='cite'>Cite</option>
                    <option value='consume'>Consume</option>
                    <option value='use'>Use</option> */}
                </select>
                <input onChange={addNumericValue} type='number' name='Unit' min='00.00' max='100.00' step='0.1' placeholder='00.00' />
                <select onChange={addUnitId} className={style.type}>
                    {units.map(unit => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
                </select>
                {/* <SingleDatePicker
                date={date} // momentPropTypes.momentObj or null
                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                /> */}
                <TextArea action={addNote} placeholder={'Add a more detailed description...'} />
                <Button action={log} type={'good'} title='Log Event' />
            </div>
        </div>
    </div>
  )
}
