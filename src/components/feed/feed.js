import React from 'react'
import style from './index.css'

export default function ({feed}) {
  return (
    <div className={style.activities_list}>
      {feed.map((item, i) => (
          <div key={i} className={style.list_item}>
            <div className={style.members}>
              <span className={style.members_item}>
                <img src={item.provider.image} />
              </span>
            </div>
            <div className={style.item_desc}>
              <span>{item.provider.name}</span> {item.action + ' ' + item.affectedQuantity.numericValue + ' ' + item.affectedQuantity.unit.name} <b>{item.receiver ? 'for ' + item.receiver.name : '' }</b>
              <div className={style.desc}>{item.note}</div>
              <div className={style.item_meta}>{item.start}</div>
            </div>
          </div>
        ))}
    </div>
  )
}
