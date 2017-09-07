import React, {Component} from 'react'
import Card from '../card'

const ListTemplate = ({setTitle, name, cards, id, openModal, moveCard, openCardController, moveCardAcrossLists, cardController,addCardToList, updateNewCardTitle, newCardTitle}) => (
  <div className='list_wrapper'>
    <div className='list'>
      <div className='list_header'>
        <h1 className={setTitle ? 'hidden header_title' : 'header_title'}>{name}</h1>
      </div>
      <div className='list_cards'>
        {cards ? cards 
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
            moveCardAcrossLists={moveCardAcrossLists}
          />
        )) : ''}
        <div className={cardController ? 'card_composer' : 'card_composer hidden'}>
          <div className='composer_card'>
            <div className='card_controller'>
              <div className='card_details'>
                <textarea onChange={updateNewCardTitle} className='list_card_composer_textarea' value={newCardTitle} />
              </div>
            </div>
          </div>
            <div className='card_controls'>
              <div className='controls_creation'>
                <button onClick={()=> addCardToList(newCardTitle, id)}>Add</button>
                <a onClick={() => openCardController()} className='icon_delete'></a> 
              </div>
            </div>
        </div>
      </div>
      <a className='open-card-composer' onClick={() => openCardController()} >Aggiungi una scheda...</a>
    </div>
  </div>
)

export default ListTemplate
