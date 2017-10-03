import React from 'react'
import CardTemplate from './cardTemplate'

const Card = (props) => {
  const {connectDragSource, id, listId, openModal, connectDropTarget, isDragging, name, note, editNote} = props
  return connectDragSource(connectDropTarget(
    <div><CardTemplate action={() => openModal(id, listId)} isDragging={isDragging} name={name} note={note || 'Add new description...'} editNote={editNote}/></div>
  ))
}

export default Card
