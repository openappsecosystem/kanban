import React from 'react'
import List from '../list'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'react/lib/update'
import Modal from '../components/modal'
import {Activity, Card, Text, Message} from '../icons'
import Module from './module'
import Button from '../components/button'
import TextArea from '../components/textarea'
import Title from '../components/title'
import Log from './log'
import {SingleDatePicker} from 'react-dates'
import Popup from '../components/popup'
import MembersPopup from './membersPopup'
const customStyles = {
 overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.6)',
    zIndex            : 9999999999,
    height            : '100%',
    justifyContent    : 'center',
    overflow          : 'auto'
  },
  content : {
    width                 : '720px',
    boxShadow             : '0 2px 8px 3px rgba(0,0,0,.3)',
    zIndex                : 9999999999,
    backgroundColor       : '#EDEFF0',
    padding:  0,
    margin:  '40px auto',
    position: 'relative'

  }
}
class Canvas extends React.Component {
  constructor (props) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    this.swipeCard = this.swipeCard.bind(this)
    this.removeCardFromList = this.removeCardFromList.bind(this)
    this.addCardToList = this.addCardToList.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onMember = this.onMember.bind(this)
    this.onProcess = this.onProcess.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.addDescription = this.addDescription.bind(this)
    this.state = {
      modalIsOpen: false,
      date: null,
      focused: false,
      lists: [
        {
          id: 393939393,
          title: 'todo',
          cards: [
            {
              id: 1389239832892389,
              title: 'do this'
            },
            {
              id: 238938989,
              title: 'do that'
            },
            {
              id: 3323232356,
              title: 'do nothing'
            }
          ]
        },
        {
          id: 3383,
          title: 'doing',
          cards: [
            {
              id: 4327837832,
              title: 'do all'
            }
          ]
        },
        {
          id: 11111,
          title: 'done',
          cards: []
        }
      ],
      modalSelected: {},
      modalDescription: false,
      memberPopup: false,
      processPopup: false
    }
  }

  addDescription () {
    this.setState({
      ...this.state,
      modalDescription: !this.state.modalDescription
    })
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

  closeModal () {
    this.setState({modalIsOpen: false})
  }

  moveCard (dragIndex, hoverIndex, currentListId) {
    const { lists } = this.state
    let currentList = lists.find(x => x.id === currentListId)
    const dragCard = currentList.cards[dragIndex]
    const listIndex = lists.map(x => x.id).indexOf(currentListId)
    let newState = update(lists, {
      [listIndex]: {
        cards: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        }
      }
    })
    this.setState({lists: newState})
  }

  removeCardFromList (cardId, currentListId) {
    const {lists} = this.state
    let list = lists.find(x => x.id === currentListId)
    const listIndex = lists.map(x => x.id).indexOf(currentListId)
    let cardIndex = list.cards
    .map(x => x.id)
    .indexOf(cardId)
    let newState = update(lists, {
      [listIndex]: {
        cards: {
          $splice: [
            [cardIndex, 1]
          ]
        }
      }
    })
    this.setState({lists: newState})
  }

  swipeCard (cardId, currentListId, nextListId) {
    const {lists} = this.state
    let list = lists.find(x => x.id === currentListId)
    const listIndex = lists.map(x => x.id).indexOf(currentListId)
    let cardIndex = list.cards
    .map(x => x.id)
    .indexOf(cardId)
    let card = list.cards.find(x => x.id === cardId)
    const nextListIndex = lists.map(x => x.id).indexOf(nextListId)
    let newState = update(lists, {
      [listIndex]: {
        cards: {
          $splice: [
            [cardIndex, 1]
          ]
        }
      },
      [nextListIndex]: {
        cards: {
          $push: [card]
        }
      }
    })
    this.setState({lists: newState})
  }

  onMember (id) {
    this.setState({
      ...this.state,
      processPopup: false,
      deletePopup: false,
      memberPopup: !this.state.memberPopup
    })
  }

  onProcess (id) {
    this.setState({
      ...this.state,
      memberPopup: false,
      deletePopup: false,
      processPopup: !this.state.processPopup
    })
  }

  onDelete (id) {
    this.setState({
      ...this.state,
      memberPopup: false,
      processPopup: false,
      deletePopup: !this.state.deletePopup
    })
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
    const {lists, modalSelected, date, memberPopup, modalDescription,modalIsOpen, deletePopup, processPopup} = this.state
    return (
      <section className='canvas'>
        <h1 className='canvas_title'>Kamakanban</h1>
        {lists.map((list, i) => (
          <List
            cards={list.cards}
            id={list.id}
            key={i}
            name={list.title}
            removeCardFromList={this.removeCardFromList}
            addCardToList={this.addCardToList}
            moveCard={this.moveCard}
            swipeCard={this.swipeCard}
            openModal={this.openModal}
          />
        ))}
        <Modal processPopup={processPopup} date={date} deletePopup={deletePopup} customStyles={customStyles} modalIsOpen={modalIsOpen} closeModal={this.closeModal} modalSelected={modalSelected} modalDescription={modalDescription} actionAddDescription={() => this.addDescription()} />

      </section>
    )
  }
}

export default DragDropContext(HTML5Backend)(Canvas)