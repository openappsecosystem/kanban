import React from 'react'
import List from '../list'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'react/lib/update'
import CardModal from '../components/cardModal/modalHOC'
import cardDnDServices from '../services/cardDnDservices'
import style from './canvas.css'

class Canvas extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      lists: this.props.lists,
      modalSelected: null
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
      modalSelected: cardId
    })
  }

  closeModal () { this.setState({modalIsOpen: false})}

  moveCard (dragIndex, hoverIndex, currentListId) {
    const { lists } = this.state
    let newState = cardDnDServices.move(lists, dragIndex, hoverIndex, currentListId)
    this.setState({lists: newState})
    return newState
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


  addNewTask () {
    console.log('add new task inside this bin')
  }


  render () {
    const {modalSelected, date, memberPopup, modalDescription, modalIsOpen, deletePopup, processPopup} = this.state
    return (
      <section className={style.canvas}>
        <h1 className={style.title}>{this.props.title}</h1>
        {this.props.lists.map((list, i) => (
          <List
            cards={list.cards}
            outputs={list.outputs}
            id={list.id}
            key={i}
            agents={this.props.allPlanAgents}
            name={list.title}
            removeCardFromList={this.removeCardFromList.bind(this)}
            addCardToList={this.addCardToList.bind(this)}
            moveCard={this.moveCard.bind(this)}
            swipeCard={this.swipeCard.bind(this)}
            openModal={this.openModal.bind(this)}
            /* MUTATIONS */
            addNewTask={this.addNewTask.bind(this)}
          />
        ))}
        <div className={style.outputs_list}>
          <h1 className={style.outputs_title}>🎉 Resources Generated</h1>
          <div className={style.list}>
            {this.props.outputs.map((output, i) => (
              output.committedOutputs.map(o => (
                <div key={i} className={style.outputs_card}>
                  <span className={style.card_output_title}>{o.committedQuantity.numericValue + ' ' + o.committedQuantity.unit.name + ' ' + o.resourceClassifiedAs.name}</span>
                </div>
              ))
            ))}
          </div>
        </div>
        <CardModal allPlanAgents={this.props.allPlanAgents} modalIsOpen={modalIsOpen} closeModal={this.closeModal.bind(this)} id={modalSelected} />
      </section>
    )
  }
}

export default DragDropContext(HTML5Backend)(Canvas)
