import React from 'react'
import style from './index.css'
import ModalTitle from './modalTitle'
import ModalMembers from './modalMembers'
import ModalActivities from './modalActivities'
import LogEvent from './logEvent'


const CardModal = ({id, allPlanAgents, units, data, close, modalDescription}) => {
  return (
    <section className={style.modal_content}>
      <ModalTitle close={close} id={data.id} note={data.note} />
    
      <div className={style.content_info}>
        <div className={style.content_module}>
          <div className={style.module_header}>
            <div className={style.header_labels}>
              <ModalMembers provider={data.provider} id={data.id} allPlanAgents={allPlanAgents} members={data.involvedAgents} />
              <div className={style.labels_due}>
                <div className={style.due}>
                  <span className={style.due_item}>Due {data.due}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={modalDescription ? style.content_description + ' ' + style.hidden : style.content_description}>
            <h4>{data.action + ' ' + data.committedQuantity.numericValue + ' ' + data.committedQuantity.unit.name + ' of ' + data.resourceClassifiedAs.name}</h4>
          </div>
        </div>
        <ModalActivities id={id} />
        <LogEvent id={id} units={units} scopeId={data.scope.id} commitmentId={data.id} />
      </div>
      {/* <div className={style.content_actions}>
        <div className={style.content_module}>
          <div className={style.content_action}>
            <div className={style.action_list}>
              <div className={style.list_archive}>
                <Button title={'Archivia'} action={() =>)} />
                <div className=? style.delete + ' ' + style.popup : style.delete + ' ' + style.popup + ' ' + style.hidden }>
                  <div className={style.popup_header}>
                    <h5>Archivia</h5>
                    <span className={style.icon_delete} onClick={() =>)}><Cross width={20} height={20} color={'#999'}/></span>
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
      </div> */}
    </section>
  )
}

export default CardModal
