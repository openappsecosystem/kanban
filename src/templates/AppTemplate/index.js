import * as React from 'react'
import { gql, graphql } from 'react-apollo'
import AuthenticatedOnly from '../../AuthenticatedOnly'
import Login from '../../login'
import Header from '../../components/header'

class AppTemplate extends React.Component {
  render () {
    const {viewer, loading, error} = this.props.data    
    return (
      <AuthenticatedOnly unauthenticatedComponent={<Login />}>
        {loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
            <div>
              <Header info={viewer.myAgent} />
              {this.props.children}
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

export default graphql(agentPlans, {
  options: (props) => ({variables: {
    token: sessionStorage.getItem('token')
}})
})(AppTemplate)
