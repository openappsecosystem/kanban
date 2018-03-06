import React from 'react'
import style from '../index.css'
import Button from '../../button'
import TextArea from '../../textarea'
import DatePicker from 'react-datepicker'
import ToggleButton from 'react-toggle-button'
// import moment from 'moment'
require("react-datepicker/dist/react-datepicker-cssmodules.css")

export default function LogEvent ({units, requestPayment, startDate, addPayment, addDate, commitmentId, scopeId, log, note, addNote, addAction, addNumericValue, addUnitId}) {
    return (
    <div className={style.content_module}>
        <div className={style.content_log}>
            {/* <h5><span className={style.content_icon}><Message width={20} height={20} color={'#999'}/></span>Log</h5> */}
            <div className={style.log_item}>
            <div className={style.item_sencence}>
                <select onChange={addAction}>
                    <option value='work'>Work</option>
                    <option value='cite'>Cite</option>
                    <option value='consume'>Consume</option>
                    <option value='use'>Use</option>
                </select>
                <input onChange={addNumericValue} type='number' name='Unit' min='00.00' max='100.00' step='0.1' placeholder='00.00' />
                <select onChange={addUnitId} className={style.type} defaultValue='2'>
                  {units.map(unit => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
                </select>
                <div className={style.item_date}>
                    <DatePicker
                      selected={startDate}
                      onChange={addDate}
                      dateFormatCalendar={'DDDD MM YYYY'}
                    />
                </div>
            </div>
                <div className={style.item_distribution}>
                    <ToggleButton
                      value={requestPayment}
                      onToggle={(value) => addPayment(value)} />
                    <label>Request payment</label>
                </div>
                <TextArea action={addNote} placeholder={'Add a more detailed description...'} />
                <Button action={log} type={'good'} title='Log Event' />
            </div>
        </div>
    </div>
  )
}
