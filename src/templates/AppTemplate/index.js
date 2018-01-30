import * as React from 'react'
import { gql, graphql } from 'react-apollo'
import AuthenticatedOnly from '../../AuthenticatedOnly'
import Login from '../../login'
// import Header from '../../components/header'
import style from './style.css'
import { withRouter } from 'react-router'
import Flag from '../../components/flag'
import Sidebar from '../../components/sidebar'

class AppTemplate extends React.Component {
  render () {
    const {viewer, loading, error} = this.props.data
    return (
      <AuthenticatedOnly unauthenticatedComponent={<Login />}>
        {loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
            <div >
              <Flag />
              <Sidebar data={viewer.myAgent} agents={viewer.myAgent.agentRelationships}/>
              {/* <Header info={viewer.myAgent} /> */}
              <div className={style.container}>
                {this.props.children}
              </div>
            </div>
          ))}
      </AuthenticatedOnly>
    )
  }
}

const agentPlans = gql`
query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        image
        agentRelationships {
          relationship {
            label
            category
          }
          object {
            id
            name
            note
          }
        }
        agentPlans {
          name
          id
          note
          planProcesses {
            name
            committedInputs {
              id
              note
              action
            }
            note
          }
        }
      }
    }
  }  
`
const App = withRouter(AppTemplate)

export default graphql(agentPlans, {
  options: (props) => ({variables: {
    token: localStorage.getItem('token')
}})
})(App)
