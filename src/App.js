import React, { Component } from 'react'
import './App.css'
import Canvas from './canvas'

class App extends Component {
  render () {
    const lists = [
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
    ]
    return (
      <div className='App'>
        <Canvas
          lists={lists}
          title={'kamakanban'}
        />
      </div>
    )
  }
}

export default App
