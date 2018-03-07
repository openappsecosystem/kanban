import React from 'react'
import style from '../index.css'
import moment from 'moment'
import Button from '../../button'
import {Cross} from '../../../icons'

export default function ({idEventToDelete, deleteEventModal, toggleDeleteEvent, activities, id, date, deleteEvent, loading, error, refetchData}) {
  return (
    <div className={style.activities_list}>
      {loading ? '' : (
        <div>
          <div className={deleteEventModal ? style.delete + ' ' + style.popup : style.delete + ' ' + style.popup + ' ' + style.hidden}>
            <div className={style.popup_header}>
              <h5>Delete Event</h5>
              <span className={style.icon_delete} onClick={() => toggleDeleteEvent(deleteEventModal)}><Cross width={20} height={20} color={'#999'}/></span>
            </div>
            <div className={style.popup_content}>
              <h5 className={style.content_description}>Are you sure to delete this event?</h5>
              <Button title={'Delete'} action={() => deleteEvent(idEventToDelete)} type={'negate'} />
            </div>
          </div>
        {activities.map((item, i) => (
          <div key={i} className={style.list_item}>
            <div className={style.members}>
              <span className={style.members_item}>
              <img src={item.fulfilledBy.provider.image} alt={item.fulfilledBy.provider.name} />
              </span>
            </div>
            <div className={style.item_desc}>
              <span>{item.fulfilledBy.provider.name}</span> {item.fulfilledBy.action + ' ' + item.fulfilledQuantity.numericValue + ' ' + item.fulfilledQuantity.unit.name } {item.fulfilledBy.requestDistribution ? <span className={style.desc_payment + ' ' + style.desc_payed}>Payed</span> : <span className={style.desc_payment + ' ' + style.desc_voluntary}>Voluntary</span>}
              <div className={style.desc}>{item.fulfilledBy.note} </div>
            </div>
            <div className={style.item_meta}>
              {moment(item.fulfilledBy.start.replace(/-/g , ", ")).fromNow()} - <span id={item.id} onClick={() => toggleDeleteEvent(deleteEventModal, item.fulfilledBy.id)}>Delete</span>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}
