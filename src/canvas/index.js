import React from 'react'
import List from '../list'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'react/lib/update'
import CardModal from '../components/cardModal'
// import {Activity, Card, Text, Message} from '../icons'
// import Module from './module'
// import Button from '../components/button'
// import TextArea from '../components/textarea'
// import Title from '../components/title'
// import Log from './log'
// import {SingleDatePicker} from 'react-dates'
// import Popup from '../components/popup'
// import MembersPopup from './membersPopup'
import cardDnDServices from '../services/cardDnDservices'
import style from './canvas.css'

class Canvas extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      lists: this.props.lists,
      modalSelected: {}
    }
  }

  openModal (cardId, listId) {
    const {lists} = this.state
    let currentCard = lists
    .find(x => x.id === listId).cards
    .find(x => x.id === cardId)
    this.setState({
      ...this.state,
      modalIsOpen: true,
      modalSelected: currentCard
    })
  }

  closeModal () { this.setState({modalIsOpen: false})}

  moveCard (dragIndex, hoverIndex, currentListId) {
    const { lists } = this.state
    let newState = cardDnDServices.move(lists, dragIndex, hoverIndex, currentListId)
    this.setState({lists: newState})
  }

  removeCardFromList (cardId, currentListId) {
    const {lists} = this.state
    let newState = cardDnDServices.remove(lists, cardId, currentListId)
    this.setState({lists: newState})
  }

  swipeCard (cardId, currentListId, nextListId) {
    const {lists} = this.state
    let newState = cardDnDServices.swipe(lists, cardId, currentListId, nextListId)
    this.setState({lists: newState})
  }

  addCardToList (text, listId) {
    let card = {
      id: Math.floor(Date.now() / 1000),
      title: text
    }
    const {lists} = this.state
    const listIndex = lists.map(x => x.id).indexOf(listId)
    let newState = update(lists, {
      [listIndex]: {
        cards: {
          $push: [card]
        }
      }
    })
    this.setState({lists: newState})
  }

  render () {
    const {modalSelected, date, memberPopup, modalDescription, modalIsOpen, deletePopup, processPopup} = this.state
    return (
      <section className={style.canvas}>
        <h1 className={style.title}>{this.props.title}</h1>
        <div className={style.inputs_list}>
          <h1>🚀 Resources involved</h1>
          <div className={style.list}>
            <div className={style.inputs_card}>
              <span>Friuts</span>
            </div>
            <div className={style.inputs_card}>
              <span>Friuts</span>
            </div>
          </div>
        </div>
        {this.props.lists.map((list, i) => (
          <List
            cards={list.cards}
            outputs={list.outputs}
            id={list.id}
            key={i}
            name={list.title}
            removeCardFromList={this.removeCardFromList.bind(this)}
            addCardToList={this.addCardToList.bind(this)}
            moveCard={this.moveCard.bind(this)}
            swipeCard={this.swipeCard.bind(this)}
            openModal={this.openModal.bind(this)}
          />
        ))}
        <div className={style.outputs_list}>
          <h1>🎉 Resources Generated</h1>
          <div className={style.list}>
            <div className={style.outputs_card}>
              <span>Friuts</span>
            </div>
            <div className={style.outputs_card}>
              <span>Friuts</span>
            </div>
          </div>
        </div>
        <CardModal modalIsOpen={modalIsOpen} closeModal={this.closeModal.bind(this)} data={modalSelected} />
      </section>
    )
  }
}

export default DragDropContext(HTML5Backend)(Canvas)