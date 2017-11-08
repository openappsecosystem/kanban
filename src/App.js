import React from 'react'
import { gql, graphql } from 'react-apollo'
import style from './App.css'
import { Link } from 'react-router-dom'
import AppTemplate from './templates/AppTemplate'

const Lists = ({data}) => {
  const {viewer, loading, error} = data
  console.log(viewer)
  return (
    <AppTemplate>
      {loading ? <strong>Loading...</strong> : (
      error ? <p style={{ color: '#F00' }}>API error</p> : (
      <div className={style.profile_lists}>
      <div className={style.lists}>
        <h2 className={style.profile_title}>👋 Hello {viewer.myAgent.name}</h2>
        <div className={style.section}>
          <div className={style.section_wrapper}>
            <div className={style.wrapper_tagline}><h5 className={style.subtitle}>Organizations</h5></div>
              <div className={style.wrapper}>
                {viewer.myAgent.agentRelationships.map((org, i) => (
                  <div key={i} className={style.lists_item}>
                    <Link key={i} to={'/organization/' + org.object.id} className='link'>
                      <h4>{org.object.name}</h4>
                        <h5 className={style.plan_scope}>{org.relationship.category}</h5>
                      {/* <p>{org.object.note || ''}</p> */}
                    </Link>
                  </div>
                ))}
              </div>
          </div>
          <div className={style.section_wrapper}>
            <div className={style.wrapper_tagline}><h5 className={style.subtitle}>Plans</h5></div>
              <div className={style.wrapper}>
                {viewer.myAgent.agentPlans.map((plan, i) => (
                  <div key={i} className={style.lists_item}>
                    <Link key={i} to={'/canvas/' + plan.id} className='link'>
                      <h4>{plan.name.length === 0 ? 'Plan ' + plan.id : plan.name }</h4>
                        <h5 className={style.plan_scope}>{plan.scope.map(scope => <span>{scope.name}</span>)}</h5>
                      <p>{plan.note || ''}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
        </div>
        </div>
      </div>
      ))}
    </AppTemplate>
  )
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
          scope {
            id
            name
          }
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
