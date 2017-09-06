import React from 'react'
import {CardTypes} from '../constants/card'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

const cardSource = {
  // canDrag (props) {
  //   return props.draggable
  // },

  beginDrag (props) {
    return {
      id: props.id,
      listId: props.listId,
      index: props.index,
      card: props
    }
  }

  // endDrag (props, monitor) {
  //   const item = monitor.getItem()
  //   const dropResult = monitor.getDropResult()
  //   if (dropResult && dropResult.listId !== item.listId) {
  //     props.moveCardAcrossLists(item.listId, dropResult.listId, item.id)
  //   }
  //   // props.handleDragEnd && props.handleDragEnd(item.id, item.laneId, dropResult ? dropResult.laneId : item.laneId)
  // }
}

const cardTarget = {
  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    const sourceListId = monitor.getItem().listId

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) { return }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return }

      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex, sourceListId)
      monitor.getItem().index = hoverIndex
  }
}

function collect (connect, monitor) {
  return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
  }
}

function dropCollect (connect) {
    return {
      connectDropTarget: connect.dropTarget(),
    }
}


const Card = (props) => {
  const {connectDragSource, id, listId, openModal, connectDropTarget, isDragging} = props
  return connectDragSource(connectDropTarget(
    <div onClick={() => openModal(id, listId)} className={isDragging ? 'card dragged' : 'card'}>
      <span className='card_title'>{props.name}</span>
    </div>
  ))
}

export default DropTarget(CardTypes.CARD, cardTarget, dropCollect)(DragSource(CardTypes.CARD, cardSource, collect)(Card))
