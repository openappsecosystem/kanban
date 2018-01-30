import React from 'react'
import style from './style.css'
import { Link } from 'react-router-dom'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'react/lib/update'
import cardDnDServices from '../services/cardDnDservices'
import StatusFlow from '../statusFlow'
import ResourcesFlow from '../resourcesFlow'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import CardModal from '../components/cardModal/modalHOC'

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
      const {modalSelected, modalIsOpen} = this.state
      const {data, loading, error} = this.props
      let customHeight = window.innerHeight
      return (
        loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
          <section className={style.surface} >
            <Tabs selectedTabClassName={style.list_active}>
            <header className={style.header}>
              <h1 className={style.title}>
                {data.name || data.planProcesses[0] ? data.planProcesses[0].name : 'Untitled Process'}
                <span className={style.header_scope}>
                  <Link to={'/agent/' + data.scope[0].id}>{data.scope[0].name}</Link>
                </span>
                <span className={style.header_scope_kanban}>
                  <TabList className={style.scope_list}>
                    <Tab>Status Flow</Tab>
                    <Tab>Resources Flow</Tab>
                  </TabList>
                  {/* <Link to={'/canvas/' + this.props.planId + '/resources-flow'}>Switch to Resources Flow</Link> */}
                </span>
              </h1>
            </header>
            <div className={style.canvas_board} style={{height: customHeight + 'px'} }>
              <TabPanel>
                <StatusFlow
                  openModal={this.openModal.bind(this)}
                  closeModal={this.closeModal.bind(this)}
                  moveCard={this.moveCard.bind(this)}
                  removeCardFromList={this.removeCardFromList.bind(this)}
                  swipeCard={this.swipeCard.bind(this)}
                  addCardToList={this.addCardToList.bind(this)}
                  addNewTask={this.addNewTask.bind(this)}
                  title={data.name || data.planProcesses[0].name}
                  project={data.scope}
                  planId={data.id}
                  outputs={data.planProcesses}
                  allPlanAgents={data.workingAgents}
                  cards={[].concat.apply([], data.planProcesses.map(process => process.committedInputs
                  .filter(comm => comm.action === 'work')
                  .map(task => (
                    {
                      id: Number(task.id),
                      title: task.action + ' ' + task.committedQuantity.numericValue + ' ' + task.committedQuantity.unit.name + ' of ' + task.resourceClassifiedAs.name,
                      members: task.involvedAgents,
                      process: task.inputOf.name,
                      due: task.due,
                      note: task.note,
                      isFinished: task.isFinished,
                      wip: task.fulfilledBy.length !== 0,
                      percentage: task.fulfilledBy
                      .map(i => i.fulfilledQuantity.numericValue)
                      .reduce((accumulator, currentValue) => accumulator + currentValue, null) * 100 / task.committedQuantity.numericValue
                    }
                ))))}
                  lists={data.planProcesses.map(list => (
                    {
                      id: Number(list.id),
                      title: list.name,
                      note: list.note,
                      due: list.plannedStart,
                      outputs: list.committedOutputs,
                      cards: list.committedInputs.map(task => (
                        {
                          id: Number(task.id),
                          title: task.action + ' ' + task.committedQuantity.numericValue + ' ' + task.committedQuantity.unit.name + ' of ' + task.resourceClassifiedAs.name,
                          members: task.involvedAgents,
                          process: task.inputOf.name,
                          due: task.due,
                          note: task.note,
                          percentage: task.fulfilledBy
                          .map(i => i.fulfilledQuantity.numericValue)
                          .reduce((accumulator, currentValue) => accumulator + currentValue, null) * 100 / task.committedQuantity.numericValue
                        }
                      ))
                    }
                ))
              }
              />
            </TabPanel>
            <TabPanel>
              <ResourcesFlow
                openModal={this.openModal.bind(this)}
                closeModal={this.closeModal.bind(this)}
                moveCard={this.moveCard.bind(this)}
                removeCardFromList={this.removeCardFromList.bind(this)}
                swipeCard={this.swipeCard.bind(this)}
                addCardToList={this.addCardToList.bind(this)}
                addNewTask={this.addNewTask.bind(this)}
                title={data.name || data.planProcesses[0].name}
                project={data.scope}
                planId={data.id}
                outputs={data.planProcesses}
                allPlanAgents={data.workingAgents}
                cards={[].concat.apply([], data.planProcesses.map(process => process.committedInputs
                  .filter(comm => comm.action === 'work')
                  .map(task => (
                  {
                    id: Number(task.id),
                    title: task.action + ' ' + task.committedQuantity.numericValue + ' ' + task.committedQuantity.unit.name + ' of ' + task.resourceClassifiedAs.name,
                    members: task.involvedAgents,
                    process: task.inputOf.name,
                    due: task.due,
                    note: task.note,
                    isFinished: task.isFinished,
                    wip: task.fulfilledBy.length !== 0
                  }
                ))))}
                lists={data.planProcesses.map(list => (
                  {
                    id: Number(list.id),
                    title: list.name,
                    note: list.note,
                    due: list.plannedStart,
                    outputs: list.committedOutputs,
                    cards: list.committedInputs
                    .filter(comm => comm.action === 'work')
                    .map(task => (
                      {
                        id: Number(task.id),
                        title: task.action + ' ' + task.committedQuantity.numericValue + ' ' + task.committedQuantity.unit.name + ' of ' + task.resourceClassifiedAs.name,
                        members: task.involvedAgents,
                        process: task.inputOf.name,
                        due: task.due,
                        note: task.note
                      }
                    ))
                  }
                ))}
              />
            </TabPanel>
          </div>
          </Tabs>
          <CardModal
            allPlanAgents={this.props.allPlanAgents}
            modalIsOpen={modalIsOpen}
            closeModal={this.closeModal.bind(this)}
            id={modalSelected}
          />
          </section>
          ))
        )
    }
}

export default DragDropContext(HTML5Backend)(Canvas)
