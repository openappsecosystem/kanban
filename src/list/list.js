import React, {Component} from 'react'
import ListTemplate from './listTemplate'

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
      const {setTitle, cardController, newCardTitle} = this.state
      return connectDropTarget(
       <span>
        <ListTemplate
          setTitle={setTitle}
          name={name}
          id={id}
          cards={cards}
          openModal={openModal}
          moveCard={moveCard}
          openCardController={this.openCardController}
          moveCardAcrossLists={this.moveCardAcrossLists}
          cardController={cardController}
          addCardToList={this.addCardToList}
          updateNewCardTitle={this.updateNewCardTitle}
          newCardTitle={newCardTitle}
        />
        </span>
      )
    }
  }

  export default List
