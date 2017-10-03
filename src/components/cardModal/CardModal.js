import React from 'react'
import Modal from 'react-modal'
import Title from '../title'
import {SingleDatePicker} from 'react-dates'
import Popup from '../popup'
import Button from '../button'
import TextArea from '../textarea'
import style from './index.css'
import {Activity, Card, Text, Message, Cross, Users} from '../../icons'
import ModalTitle from './modalTitle'
import ModalMembers from './modalMembers'
import ModalActivities from './modalActivities'

const CardModal = ({allPlanAgents, note, showInputTitle, showEditTitle, onMember, onUpdateNote, onProcess, onDelete, date, memberPopup, processPopup, deletePopup, data, modalDescription, addDescription}) => {
  return (
    <section className={style.modal_content}>
      <ModalTitle id={data.id} note={data.note} />
      <div className={style.content_info}>
        <div className={style.content_module}>
          <div className={style.module_header}>
            <div className={style.header_labels}>
              <ModalMembers provider={data.provider} id={data.id} allPlanAgents={allPlanAgents} members={data.involvedAgents} />
              <div className={style.labels_due}>
                <div className={style.due}>
                  <span className={style.due_item}>Due to {data.due}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={modalDescription ? style.content_description + ' ' + style.hidden : style.content_description}>
            {/* <a className={style.info_add} onClick={() => addDescription()}>
              <span className={style.add_icon}>
                <Text width={16} height={16} color={'#999'}/>
              </span>Inserisci la descrizione...
            </a> */}
            <h4>{data.action + ' ' + data.committedQuantity.numericValue + ' ' + data.committedQuantity.unit.name + ' of ' + data.resourceClassifiedAs.name}</h4>
          </div>

          {/* <div className={modalDescription ? style.description_text : style.description_text + ' ' + style.hidden}>
            <TextArea placeholder={'Add a more detailed description...'} />
            <div className={style.text_controls}>
              <div className={style.controls_creation}>
                <Button title={'Add'} type={'inline'} />
                <span className={style.icon_delete} onClick={() => addDescription()}><Cross width={20} height={20} color={'#999'}/></span> 
              </div>
            </div>
          </div> */}
        </div>
        <ModalActivities activities={data.fulfilledBy}/>
        
        <div className={style.content_module}>
          <div className={style.content_log}>
            <h5>
              <span className={style.content_icon}><Message width={20} height={20} color={'#999'}/></span>
              Log</h5>
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
              <TextArea placeholder={'Add a more detailed description...'}  />
              <Button type={'good'} title='Update Task'/>
            </div>
          </div>
        </div>
   
      </div>
      <div className={style.content_actions}>
        <div className={style.content_module}>
          <div className={style.content_action}>
            <div className={style.action_list}>
              <div className={style.list_archive}>
                <Button title={'Archivia'} action={() => onDelete()} />
                <div className={deletePopup ? style.delete + ' ' + style.popup : style.delete + ' ' + style.popup + ' ' + style.hidden }>
                  <div className={style.popup_header}>
                    <h5>Archivia</h5>
                    <span className={style.icon_delete} onClick={() => onDelete()}><Cross width={20} height={20} color={'#999'}/></span>
                  </div>
                  <div className={style.popup_content}>
                    <h5 className={style.content_description}>Sicuro di volerla eliminare?</h5>
                    <Button title={'Delete'} type={'negate'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardModal
