import React from 'react'
import { gql, graphql } from 'react-apollo'
import Component from './index'
import AppTemplate from '../templates/AppTemplate'

const plan = gql`
query ($token: String, $id: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        id
        name
        image
        agentEconomicEvents {
            note
          }
          agentPlans {
            name
            id
            note
            plannedOn
            planProcesses {
              isStarted
              isFinished
              name
              workingAgents {
                id
                name
                image
              }
            }
          }
      }
    }
  }
  
`
class AgentWrapper extends React.Component {
  render () {
    const {loading, error, data} = this.props
    return (
      <AppTemplate>
        {loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component data={data} />
        ))}
      </AppTemplate>
    )
  }
}

export default graphql(plan, {
  options: (props) => ({ variables: {
    token: localStorage.getItem('token'),
    id: props.match.params.id
  }}),
  props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
    loading: loading,
    error: error,
    refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
    data: viewer ? viewer.agent : null
  })
})(AgentWrapper)
