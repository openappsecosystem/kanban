import React, {Component} from 'react'

class AuthenticatedOnly extends Component {
    render () {
      let isLoggedIn = localStorage.getItem('token')
      return (isLoggedIn ? this.props.children : this.props.unauthenticatedComponent)
    }
}  

export default AuthenticatedOnly
