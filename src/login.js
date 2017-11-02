import React from 'react'
import { gql, graphql } from 'react-apollo'

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.user = this.user.bind(this)
        this.password = this.password.bind(this)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin = async () => {
        await this.props.mutate({variables: {username: this.state.username, password: this.state.password}})
        .then (res => {
            console.log(res)
            return sessionStorage.setItem('token', res.data.createToken.token)})
        this.props.history.replace('/')
    }

    user (e) {
        this.setState({
            username: e.target.value
        })    
    }

    password (e) {
        this.setState({
            password: e.target.value
        })    
    }

    render () {
        const {username, password} = this.state
        return (
            <div>
                <input type='text' value={username} onChange={this.user} className='username' />
                <input type='password' value={password} onChange={this.password} className='password' />
                <button onClick={()=>this.handleLogin()}>login</button>
            </div>
        )
    }
}


const loginMutation = gql`
mutation($username: String!, $password: String!) {
    createToken(username: $username, password: $password) {
      token
    }
  }
`

const LoginWithMutation = graphql(loginMutation)(Login)

export default LoginWithMutation
