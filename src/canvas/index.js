import React from 'react'
import List from '../list'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'react/lib/update'
import Modal from 'react-modal'
import {Activity, Card, Text, Message} from '../icons'
import Module from './module'
import Button from '../components/button'
import TextArea from '../components/textarea'
import Title from '../components/title'
import Log from './log'
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
    const {lists, modalSelected, memberPopup, deletePopup, processPopup} = this.state
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='CardModal'
          style={customStyles}
        >
        <section className='modal_content'>
            <div className='content_header'>
              <Title icon={<Card width={20} height={20} color={'#999'}/>} title={modalSelected.title} />
              <span className='header_sub'>Nella lista <i>Todo</i></span>
            </div>
            <div className='content_info'>
              <div className='content_module'>
                <div className='module_header'>
                  <div className='header_labels'>
                    <div className='labels_members'>
                      <h5>Members</h5>
                      <div className='members'>
                        <span className='members_item' />
                      </div>
                    </div>
                    <div className='labels_process'>
                      <h5>Process</h5>
                      <div className='process'>
                        <span className='process_item'>Process ABC</span>
                      </div>
                    </div>
                    <div className='labels_due'>
                      <h5>Due</h5>
                      <div className='due'>
                        <span className='due_item'>Domani alle 12:00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={this.state.modalDescription ? 'content_description hidden' : 'content_description'}>
                  <a className='info_add' onClick={() => this.addDescription()}>
                    <span className='add_icon'>
                      <Text width={16} height={16} color={'#999'}/>
                    </span>Inserisci la descrizione...
                  </a>
                </div>
                <div className={this.state.modalDescription ? 'description_text' : 'description_text hidden'}>
                  <TextArea placeholder={'Add a more detailed description...'} />
                  <div className='text_controls'>
                    <div className='controls_creation'>
                      <Button title={'Add'} />
                      <a className='icon_delete' onClick={() => this.addDescription()}></a> 
                    </div>
                  </div>
                </div>
              </div>
              <Module title={'Log your action'} icon={<span className='content_icon'><Message width={20} height={20} color={'#999'}/></span>} content={<Log />}/>
              {/* <div className='content_module'>
                <div className='content_log'>
                  <h5>
                    <span className='content_icon'><Message width={20} height={20} color={'#999'}/></span>
                    Log your actions</h5>
                  <div className='log_item'>
                    <div className='members'>
                      <span className='members_item'></span>
                    </div>
                    <select>
                      <option>Work</option>
                      <option>Cite</option>
                      <option>Consume</option>
                    </select>
                    <input type='number' name='Hour' min='00.00' max='100.00' step='0.1' placeholder='00.00' />
                    <select className='type'>
                      <option>Hour</option>
                      <option>Words</option>
                    </select>
                    <SingleDatePicker
                      date={this.state.date} // momentPropTypes.momentObj or null
                      onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                      focused={this.state.focused} // PropTypes.bool
                      onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    />
                  </div>
                </div>
              </div> */}
              <div className='content_module'>
                <div className='content_activities'>
                  <h5>
                    <span className='content_icon'>
                      <Activity width={20} height={20} color={'#999'}/>
                    </span> Activities</h5>
                  <div className='activities_list'>
                    <div className='list_item'>
                      <div className='members'>
                        <span className='members_item' />
                      </div>
                      <div className='item_desc'>
                        <span>Bernini</span> ha lavorato 4 ore su questo task
                      </div>
                      <div className='item_meta'>
                        33 min fa
                      </div>
                    </div>
                    <div className='list_item'>
                      <div className='members'>
                        <span className='members_item' />
                      </div>
                      <div className='item_desc'>
                        <span>Bernini</span> ha lavorato 4 ore su questo task
                      </div>
                      <div className='item_meta'>
                        33 min fa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='content_actions'>
              <div className='content_module'>
                <div className='content_action'>
                  <h5>Actions</h5>
                  <div className='action_list'>
                    <div className='list_members'>
                      <Button action={() => this.onMember()} title={'Members'} />
                      <div className='members popup'>
                        <div className='popup_header'>
                          <h5>Members</h5>
                        </div>
                        <div className='popup_content'>
                          <div className='content_list'>
                            <div className='list_item'>
                              <div className='members'>
                                <span className='members_item' />
                              </div>
                              <h5 className='members_name'>Bernini</h5>
                              <span className='members_active'></span>
                            </div>
                            <div className='list_item'>
                              <div className='members'>
                                <span className='members_item' />
                              </div>
                              <h5 className='members_name'>Maro</h5>
                              <span className='members_active'></span>
                            </div>
                            <div className='list_item'>
                              <div className='members'>
                                <span className='members_item' />
                              </div>
                              <h5 className='members_name'>Bhaugen</h5>
                              <span className='members_active'></span>
                            </div>
                            <div className='list_item'>
                              <div className='members'>
                                <span className='members_item' />
                              </div>
                              <h5 className='members_name'>Fosterlynn</h5>
                              <span className='members_active'></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='list_process'>
                      <button onClick={() => this.onProcess()}>Process</button>
                      <div className={processPopup ? 'process popup' : 'process popup hidden' }>
                        <div className='popup_header'>
                          <h5>Process</h5>
                        </div>
                        <div className='popup_content'>
                          <select className='content_process'>
                            <option>option 1</option>
                            <option>option 2</option>
                            <option>option 3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button>Due</button>
                    <div className='list_archive'>
                      <button onClick={() => this.onDelete()}>Archivia</button>
                      <div className={deletePopup ? 'delete popup' : 'delete popup hidden' }>
                        <div className='popup_header'>
                          <h5>Archivia</h5>
                        </div>
                        <div className='popup_content'>
                          <h5 className='content_description'>Sicuro di volerla eliminare?</h5>
                          <button className='button negate content_delete'>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>
        </Modal>
      </section>
    )
  }
}

export default DragDropContext(HTML5Backend)(Canvas)