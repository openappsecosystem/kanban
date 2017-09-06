import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'

export default class Square extends Component {
    static propTypes = {
        black: PropTypes.bool
    }

    render () {
        const {black} = this.props
        const fill = black ? 'black' : 'white'
        return <div style={{
        backgroundColor: fill,
        width: '100%',
        height: '100%'}}>
            {this.props.children}
        </div>
    }
}