import React from 'react'

const CardTemplate = ({action ,isDragging, name}) => (
  <div onClick={action} className={isDragging ? 'card dragged' : 'card'}>
    <span className='card_title'>{name}</span>
  </div>
)

export default CardTemplate
