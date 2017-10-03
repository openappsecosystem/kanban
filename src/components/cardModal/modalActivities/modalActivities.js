import React from 'react'
import style from '../index.css'

export default function ({activities}) {
  console.log(activities)
  return (
    <div className={style.activities_list}>
      {/* <div className={style.list_item}>
        <div className={style.members}>
          <span className={style.members_item}>
          <img src={activities.fulfilledBy.provider.image} alt={activities.fulfilledBy.provider.name} />
          </span>
        </div>
        <div className={style.item_desc}>
          <span>{activities.fulfilledBy.provider.name}</span> {activities.fulfilledBy.action + ' ' + activities.fulfilledBy.committedQuantity.numericValue + ' ' + activities.fulfilledBy.committedQuantity.unit.name }
          <div className={style.desc}>{activities.fulfilledBy.note}</div>
        </div>
        <div className={style.item_meta}>
          {activities.fulfilledBy.start}
        </div>
      </div> */}
      {
        activities.map((item, i) => (
          <div key={i} className={style.list_item}>
            <div className={style.members}>
              <span className={style.members_item}>
              <img src={item.fulfilledBy.provider.image} alt={item.fulfilledBy.provider.name} />
              </span>
            </div>
            <div className={style.item_desc}>
              <span>{item.fulfilledBy.provider.name}</span> {item.fulfilledBy.action + ' ' + item.fulfilledQuantity.numericValue + ' ' + item.fulfilledQuantity.unit.name }
              <div className={style.desc}>{item.fulfilledBy.note}</div>
            </div>
            <div className={style.item_meta}>
              33 min fa
            </div>
          </div>
        ))
      }
    </div>
  )
}
