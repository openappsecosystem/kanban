import React from 'react'
import List from '../list'
import style from './canvas.css'
class Canvas extends React.Component {
  render () {
    return (
            <div className={style.board}>
            <div className={style.board_panels}>
              {this.props.lists.map((list, i) => (
                <List
                  cards={list.cards}
                  outputs={list.outputs}
                  id={list.id}
                  key={i}
                  info={list}
                  agents={this.props.allPlanAgents}
                  name={list.title}
                  removeCardFromList={this.props.removeCardFromList}
                  addCardToList={this.props.addCardToList}
                  moveCard={this.props.moveCard}
                  swipeCard={this.props.swipeCard}
                  openModal={this.props.openModal}
                  addNewTask={this.props.addNewTask}
                />
              ))}
              {/* <div className={style.outputs_list}>
                <h1 className={style.outputs_title}>🎉 All Outputs</h1>
                <div className={style.list}>
                  {this.props.outputs.map((output, i) => (
                    output.committedOutputs.map(o => (
                      <div key={i} className={style.outputs_card}>
                        <span className={style.card_output_title}>{o.committedQuantity.numericValue + ' ' + o.committedQuantity.unit.name + ' ' + o.resourceClassifiedAs.name}</span>
                      </div>
                    ))
                  ))}
                </div>
              </div> */}
              </div>
            </div>
    )
  }
}

export default Canvas
