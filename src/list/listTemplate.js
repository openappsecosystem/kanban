import React from 'react'
import Card from '../card'
import style from './index.css'
import Button from '../components/button'
import TextArea from '../components/textarea'

const ListTemplate = ({setTitle, name, agents, info, cards, outputs, id, openModal, moveCard, openCardController, cardController, addCardToList, updateNewCardTitle, newCardTitle}) => {
  return (
  <div className={style.list_wrapper}>
    <div className={style.list}>
      <div className={style.list_header}>
        <h1 className={setTitle ? style.hidden + ' ' + style.header_title : style.header_title}>{name}</h1>
        {info.note
        ? <p className={style.header_desc}>{info.note}</p>
        : ''}
        <div className={style.header_infos}>
          {agents.map((a, i) => (
            <div key={i} className={style.header_members}>
              <span className={style.members_item}>
                <img className={style.item_photo} src={a.image} />
              </span>
            </div>
          ))}
          {info.due
          ? <div className={style.header_due}>
            <span className={style.due_item}>Due {info.due}</span>
          </div>
          : '' }
        </div>
      </div>
      <div className={style.list_cards}>
        <h2>Commitments ({cards.length})</h2>
        {cards ? cards
        .map((card, i) => (
          <div key={i}>
          <Card
            key={card.id}
            listId={id}
            id={card.id}
            index={i}
            openModal={openModal}
            name={card.title}
            moveCard={moveCard}
            status={card.status}
            note={card.note || card.title}
            newNote= {''}
          />
          </div>
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
                <a onClick={() => openCardController()} className={style.icon_delete} />
              </div>
            </div>
        </div>
      </div>
      {outputs.length !== 0 
      ? <div className={style.list_outputs}>
          <h2>Outputs ({outputs.length})</h2>
          {/* {outputs.map((o, i) => (
            <div key={i} className={style.outputs_card}>
              <span>{o.title}</span>
            </div>
          ))} */}
        </div>
      : '' }
      <a className={style.open_card_composer} onClick={() => openCardController()} >Create a new commitment...</a>
    </div>
  </div>
)}

export default ListTemplate
