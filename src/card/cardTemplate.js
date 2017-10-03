import React from 'react'
import style from './index.css'

const CardTemplate = (props) => {
  return (
  <div onClick={props.action} className={props.isDragging ? style.card + ' ' + style.dragged : style.card}>
    <span className={style.card_title}>{props.note}</span>
  </div>
)}

export default CardTemplate
