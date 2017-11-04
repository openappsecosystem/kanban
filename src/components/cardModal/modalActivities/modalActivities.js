import React from 'react'
import style from '../index.css'

export default function ({activities, id, date, deleteEvent, loading, error, refetchData}) {
  return (
    <div className={style.activities_list}>
      {loading ? '' : (
        activities.map((item, i) => (
          <div key={i} className={style.list_item}>
            <div className={style.members}>
              <span className={style.members_item}>
              <img src={item.fulfilledBy.provider.image} alt={item.fulfilledBy.provider.name} />
              </span>
            </div>
            <div className={style.item_desc}>
              <span>{item.fulfilledBy.provider.name}</span> {item.fulfilledBy.action + ' ' + item.fulfilledQuantity.numericValue + ' ' + item.fulfilledQuantity.unit.name }
              <div className={style.desc}>{item.fulfilledBy.note} </div>
            </div>
            <div className={style.item_meta}>
              {item.fulfilledBy.start} - <span id={item.id} onClick={() => deleteEvent(item.fulfilledBy.id)}>Delete</span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
