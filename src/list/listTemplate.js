import React, {Component} from 'react'
import Card from '../card'
import style from './index.css'
import Button from '../components/button'
import TextArea from '../components/textarea'

const ListTemplate = ({setTitle, name, cards, id, openModal, moveCard, openCardController, moveCardAcrossLists, cardController,addCardToList, updateNewCardTitle, newCardTitle}) => (
  <div className={style.list_wrapper}>
    <div className={style.list}>
      <div className={style.list_header}>
        <h1 className={setTitle ? style.hidden + ' ' +  style.header_title : style.header_title}>{name}</h1>
      </div>
      <div className={style.list_cards}>
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
        <div className={cardController ? style.card_composer : style.card_composer + ' ' + style.hidden}>
          <div className={style.composer_card}>
            <div className={style.card_controller}>
              <div className={style.card_details}>
                <TextArea action={updateNewCardTitle} type={'white'} title={newCardTitle} />
              </div>
            </div>
          </div>
            <div className={style.card_controls}>
              <div className={style.controls_creation}>
                <Button action={()=> addCardToList(newCardTitle, id)} title={'Add'} />
                <a onClick={() => openCardController()} className={style.icon_delete}></a> 
              </div>
            </div>
        </div>
      </div>
      <a className={style.open_card_composer} onClick={() => openCardController()} >Aggiungi una scheda...</a>
    </div>
  </div>
)

export default ListTemplate
