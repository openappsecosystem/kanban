import React from 'react'
import style from './index.css'

const CardTemplate = ({action, isDragging, name}) => (
  <div onClick={action} className={isDragging ? style.card + ' ' + style.dragged : style.card}>
    <span className={style.card_title}>{name}</span>
  </div>
)

export default CardTemplate
