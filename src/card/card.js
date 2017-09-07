import React from 'react'
import CardTemplate from './cardTemplate'

const Card = (props) => {
  const {connectDragSource, id, listId, openModal, connectDropTarget, isDragging, name} = props
  return connectDragSource(connectDropTarget(
    <div><CardTemplate action={() => openModal(id, listId)} isDragging={isDragging} name={name}/></div>
  ))
}

export default Card
