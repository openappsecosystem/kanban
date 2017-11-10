import React from 'react'
import style from './style.css'

const Flag = ({data, deleteFlag}) => {
  return (
    <div className={data.length > 0 ? style.flag + ' ' + style.active : style.flag}>
      <div className={style.flat_internal}>
        <div className={style.header}>
          <span className={style.header_icon}></span>
          <h1>{data.title || 'Custom message'}</h1>
          <span className={style.header_close}></span>
        </div>
        <h5 className={style.flag_description}>{data.message || ''}</h5>
      </div>
    </div>
  )
}

export default Flag
