import React from 'react'
import style from '../index.css'
import Title from '../../title'
import {Left} from '../../../icons'

export default function ModalTitle ({action, close, isVisible, keyword, note, editTitle, toggleVisibility }) {
  return (
      <div className={style.content_header}>
        <span onClick={close} className={style.back}><Left color={'#fff'} width={18} height={18}/></span>
        {isVisible ? '' : <span onClick={toggleVisibility} className={style.title}><Title title={note || 'Add new description...'} /></span>}
        {isVisible ? <input autoFocus onBlur={toggleVisibility} className={style.header_note_input} defaultValue={note} onChange={editTitle} /> : ''}
      </div>
    )
}