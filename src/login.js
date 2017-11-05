import React from 'react'
import { gql, graphql } from 'react-apollo'
import style from './base.css'
import { withRouter } from 'react-router'

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
        .then (res => {return sessionStorage.setItem('token', res.data.createToken.token)})
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
            <h5 className={style.alert}>☠️ This project is currently in alpha and uses OCP data. Be careful or wait for more stable release.</h5>
            <div className={style.login_wrapper}>
            <div className={style.wrapper_container}>
                <h1 className={style.wrapper_title}>🌔 Welcome to OCW Kanban <span>0.0.1</span></h1>
                <h5 className={style.wrapper_desc}>Log in with your ocp credential</h5>
                <input type='text' value={username} onChange={this.user} className='username' />
                <input type='password' value={password} onChange={this.password} className='password' />
                <button onClick={()=>this.handleLogin()}>login</button>
                <div className={style.wrapper_features}>
                    <h3>Current Features</h3>
                    <ul className={style.feature_list}>
                        <li>- Check the status of plans you belong to</li>
                        <li>- Edit the name of commitments</li>
                        <li>- Log events to commitments</li>
                        <li>- Delete events to commitments</li>
                    </ul>
                </div>
                </div>
            </div>
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

export default withRouter(LoginWithMutation)
