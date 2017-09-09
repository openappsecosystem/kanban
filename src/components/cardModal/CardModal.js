import React from 'react'
import Modal from 'react-modal'
import Title from '../title'
import {SingleDatePicker} from 'react-dates'
import Popup from '../popup'
import Button from '../button'
import TextArea from '../textarea'
import style from './index.css'
import {Activity, Card, Text, Message, Cross} from '../../icons'

const CardModal = ({onMember, onProcess, onDelete, date, memberPopup, processPopup, deletePopup, modalSelected, modalDescription, addDescription}) => (
    <section className={style.modal_content}>
      <div className={style.content_header}>
        <Title icon={<Card width={20} height={20} color={'#999'}/>} title={modalSelected.title} />
        <span className={style.header_sub}>Nella lista <i>Todo</i></span>
      </div>
      <div className={style.content_info}>
        <div className={style.content_module}>
          <div className={style.module_header}>
            <div className={style.header_labels}>
              <div className={style.labels_members}>
                <h5>Members</h5>
                <div className={style.members}>
                  <span className={style.members_item} />
                </div>
              </div>
              <div className={style.labels_process}>
                <h5>Process</h5>
                <div className={style.process}>
                  <span className={style.process_item}>Process ABC</span>
                </div>
              </div>
              <div className={style.labels_due}>
                <h5>Due</h5>
                <div className={style.due}>
                  <span className={style.due_item}>Domani alle 12:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className={modalDescription ? style.content_description + ' ' + style.hidden : style.content_description}>
            <a className={style.info_add} onClick={() => addDescription()}>
              <span className={style.add_icon}>
                <Text width={16} height={16} color={'#999'}/>
              </span>Inserisci la descrizione...
            </a>
          </div>
          <div className={modalDescription ? style.description_text : style.description_text + ' ' + style.hidden}>
            <TextArea placeholder={'Add a more detailed description...'} />
            <div className={style.text_controls}>
              <div className={style.controls_creation}>
                <Button title={'Add'} type={'inline'} />
                <span className={style.icon_delete} onClick={() => addDescription()}><Cross width={20} height={20} color={'#999'}/></span> 
              </div>
            </div>
          </div>
        </div>
        
        <div className={style.content_module}>
          <div className={style.content_log}>
            <h5>
              <span className={style.content_icon}><Message width={20} height={20} color={'#999'}/></span>
              Log your actions</h5>
            <div className={style.log_item}>
              <div className={style.members}>
                <span className={style.members_item}></span>
              </div>
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
            </div>
          </div>
        </div>
        <div className={style.content_module}>
          <div className={style.content_activities}>
            <h5><span className={style.content_icon}><Activity width={20} height={20} color={'#999'}/></span> Activities</h5>
            <div className={style.activities_list}>
              <div className={style.list_item}>
                <div className={style.members}>
                  <span className={style.members_item} />
                </div>
                <div className={style.item_desc}>
                  <span>Bernini</span> ha lavorato 4 ore su questo task
                </div>
                <div className={style.item_meta}>
                  33 min fa
                </div>
              </div>
              <div className={style.list_item}>
                <div className={style.members}>
                  <span className={style.members_item} />
                </div>
                <div className={style.item_desc}>
                  <span>Bernini</span> ha lavorato 4 ore su questo task
                </div>
                <div className={style.item_meta}>
                  33 min fa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.content_actions}>
        <div className={style.content_module}>
          <div className={style.content_action}>
            <h5>Actions</h5>
            <div className={style.action_list}>
              <div className={style.list_members}>
                <Button action={() => onMember()} title={'Members'} />
                <div className={memberPopup ? style.members + ' ' + style.popup : style.members + ' ' + style.popup + ' ' + style.hidden}>
                  <div className={style.popup_header}>
                    <h5>Members</h5>
                    <span className={style.icon_delete} onClick={() => onMember()}><Cross width={20} height={20} color={'#999'}/></span>
                  </div>
                  <div className={style.popup_content}>
                    <div className={style.content_list}>
                      <div className={style.list_item}>
                        <div className={style.members}>
                          <span className={style.members_item} />
                        </div>
                        <h5 className={style.members_name}>Bernini</h5>
                        <span className={style.members_active}></span>
                      </div>
                      <div className={style.list_item}>
                        <div className={style.members}>
                          <span className={style.members_item} />
                        </div>
                        <h5 className={style.members_name}>Maro</h5>
                        <span className={style.members_active}></span>
                      </div>
                      <div className={style.list_item}>
                        <div className={style.members}>
                          <span className={style.members_item} />
                        </div>
                        <h5 className={style.members_name}>Bhaugen</h5>
                        <span className={style.members_active}></span>
                      </div>
                      <div className={style.list_item}>
                        <div className={style.members}>
                          <span className={style.members_item} />
                        </div>
                        <h5 className={style.members_name}>Fosterlynn</h5>
                        <span className={style.members_active}></span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Popup
                  type={'members'}
                  title={'Members'}
                  content={<MembersPopup />}
                /> */}
              </div>
              <div className={style.list_process}>
                <Button title={'Process'} action={() => onProcess()} />
                <div className={processPopup ? style.process + ' ' + style.popup : style.process  + ' ' +style.popup + ' ' + style.hidden }>
                  <div className={style.popup_header}>
                    <h5>Process</h5>
                    <span className={style.icon_delete} onClick={() => onProcess()}><Cross width={20} height={20} color={'#999'}/></span>
                  </div>
                  <div className={style.popup_content}>
                    <select className={style.content_process}>
                      <option>option 1</option>
                      <option>option 2</option>
                      <option>option 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <Button title={'Due'} />
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

export default CardModal