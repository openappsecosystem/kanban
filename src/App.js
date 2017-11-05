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
        <h2 className={style.profile_title}>👋 Hello {viewer.myAgent.name}</h2>
        <div className={style.section}>
          <div className={style.section_wrapper}>
            <div className={style.wrapper_tagline}><h5 className={style.subtitle}>Plans</h5></div>
              <div className={style.wrapper}>
              {viewer.myAgent.agentPlans.map((plan, i) => (
                <div key={i} className={style.lists_item}>
                  <Link key={i} to={'/canvas/' + plan.id} className='link'>
                    <h4>{plan.name.length === 0 ? 'unassigned name' : plan.name }</h4>
                    <p>{plan.note || 'unassigned note'}</p>
                  </Link>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
    )
))}

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
})(Lists)
