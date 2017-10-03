import React from 'react'
import style from '../index.css'
import Title from '../../title'

export default function ModalTitle({action, isVisible, keyword, note, editTitle, toggleVisibility }) {
  return (
      <div className={style.content_header}>
        <span className={style.header_sub}>{action || 'work'}</span>
        {isVisible ? '' : <span onClick={toggleVisibility} className={style.title}><Title title={note || 'Add new description...'} /></span>}
        {isVisible ? <input autoFocus onBlur={toggleVisibility} className={style.header_note_input} defaultValue={note} onChange={editTitle} /> : ''}
      </div>
    )
}