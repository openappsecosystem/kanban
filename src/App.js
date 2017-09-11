import React from 'react'
import { gql, graphql } from 'react-apollo'
import style from './App.css'
import { Link } from 'react-router-dom'

const Lists = ({data}) => {
  const {viewer, loading, error} = data
  return (
    loading ? <strong>Loading...</strong> : (
    error ? <p style={{ color: '#F00' }}>API error</p> : (
      <div className={style.lists}>
        <h2>All plans</h2>
          {viewer.agent.agentPlans.map((plan, i) => (
            <Link
              key={i}
              to={'/canvas/' + plan.id }
              className='link'
            >
            <div key={i} className={style.lists_item}>
              <h4>{plan.name.length === 0 ? 'unassigned name' : plan.name }</h4>
              <p>{plan.note || 'unassigned note'}</p>
            </div>
            </Link>
          ))}
      </div>
    )
))}


const agentPlans = gql`
query ($token: String, $agentId: Int) {
    viewer(token: $token) {
      agent(id: $agentId) {
        id
        name
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
      token: sessionStorage.getItem('token'),
    agentId: 24
}})
})(Lists)
