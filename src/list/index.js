import React, {Component} from 'react'
import { DropTarget } from 'react-dnd'

import {CardTypes} from '../constants/card'
import List from './list'

const cardTarget = {
  drop (props, monitor, component) {
    const nextListId = props.id
    const cardId = monitor.getItem().id
    const currentListId = monitor.getItem().listId

    if (nextListId === currentListId) {
      return
    }
    // props.removeCardFromList(cardId, currentListId)
    props.swipeCard(cardId, currentListId, nextListId)
  }
}

function dropCollect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOVer: monitor.isOver()
  }
}

export default DropTarget(CardTypes.CARD, cardTarget, dropCollect)(List)
