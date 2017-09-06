import React, {Component} from 'react'
import { DropTarget } from 'react-dnd'
import Card from '../card'
import {CardTypes} from '../constants/card'

const cardTarget = {
  drop (props, monitor, component) {
    const nextListId = props.id
    const cardId = monitor.getItem().id
    const currentListId = monitor.getItem().listId

    if (nextListId === currentListId) {
      console.log('same id nothing happens')
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

class List extends Component {
  constructor (props) {
    super(props)
    this.setTitle = this.setTitle.bind(this)
    this.openCardController = this.openCardController.bind(this)
    this.updateNewCardTitle = this.updateNewCardTitle.bind(this)
    this.addCardToList = this.addCardToList.bind(this)
    this.state = {
      setTitle: false,
      cardController: false,
      newCardTitle: ''
    }
  }

  openCardController () {
    this.setState({
      ...this.state,
      newCardTitle: '',
      cardController: !this.state.cardController
    })
  }

  updateNewCardTitle (e) {
    this.setState({
      ...this.state,
      newCardTitle: e.target.value
    })
  }

  setTitle () {
    this.setState({
      ...this.state,
      setTitle: !this.state.setTitle
    })
  }

  addCardToList () {
    this.openCardController()
    this.props.addCardToList(this.state.newCardTitle, this.props.id)
  }

  render () {
    const {name, id, moveCard, cards, openModal, connectDropTarget} = this.props
    return connectDropTarget(
      <div className='list_wrapper'>
        <div className='list'>
          <div className='list_header'>
            <h1 className={this.state.setTitle ? 'hidden header_title' : 'header_title'}>{name + ' (' + cards.length + ')'}</h1>
            {/* <textarea className={this.state.setTitle ? 'header_setName' : 'header_setName isEditing'} aria-label={name} spellcheck="false" maxlength="512">{name}</textarea> */}
          </div>
          <div className='list_cards'>
            {cards
            .map((card, i) => (
              <Card
                key={card.id}
                listId={id}
                id={card.id}
                index={i}
                openModal={openModal}
                name={card.title}
                moveCard={moveCard}
                status={card.status}
                moveCardAcrossLists={this.moveCardAcrossLists}
              />
            ))}
            <div className={this.state.cardController ? 'card_composer' : 'card_composer hidden'}>
              <div className='composer_card'>
                <div className='card_controller'>
                  <div className='card_details'>
                    <textarea onChange={this.updateNewCardTitle} className='list_card_composer_textarea' value={this.state.newCardTitle} />
                  </div>
                </div>
              </div>
                <div className='card_controls'>
                  <div className='controls_creation'>
                    <button onClick={()=> this.addCardToList(this.state.newCardTitle, id)}>Add</button>
                    <a onClick={() => this.openCardController()} className='icon_delete'></a> 
                  </div>
                </div>
            </div>
          </div>
          <a className='open-card-composer' onClick={() => this.openCardController()} >Aggiungi una scheda...</a>
        </div>
      </div>
    )
  }
}

export default DropTarget(CardTypes.CARD, cardTarget, dropCollect)(List)
