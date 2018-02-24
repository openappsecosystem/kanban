import React from 'react'
import { gql, graphql } from 'react-apollo'
import style from './App.css'
import { Link } from 'react-router-dom'
import AppTemplate from './templates/AppTemplate'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Feed from './components/feed/feed'
import Card from './components/card'

class Lists extends React.Component {
  componentDidMount () {
  }
  render () {
    const {viewer, loading, error} = this.props.data
    return (
    <AppTemplate>
      {loading ? <strong>Loading...</strong> : (
      error ? <p style={{ color: '#F00' }}>API error</p> : (
      <div className={style.profile_lists}>
      <div className={style.lists}>
        <h2 className={style.profile_title}>👋 Hello {viewer.myAgent.name}</h2>
        <h5 className={style.profile_address}>ƒ <span>{viewer.myAgent.faircoinAddress}</span></h5>
        <div className={style.section}>
          <div className={style.section_wrapper}>
          <Tabs selectedTabClassName={style.list_active}>
          <TabList className={style.scope_list}>
              <Tab>Overview</Tab>
              <Tab>Feed</Tab>
          </TabList>
          <TabPanel>
            <div className={style.section_wrapper + ' ' + style.section_wrapper_box}>
                <div className={style.wrapper_tagline}><h5 className={style.subtitle}>Plans</h5></div>
                  <div className={style.wrapper}>
                    {viewer.myAgent.agentPlans.map((plan, i) => (
                      <div key={i} className={style.lists_item}>
                        <Link key={plan.id} to={'/canvas/' + plan.id} className={style.link}>
                          <h4 className={style.item_title}>{plan.name.length === 0 ? plan.planProcesses[0].name : plan.name }</h4>
                          <h5 className={style.plan_scope}>{plan.scope.map(scope => <span>{scope.name}</span>)}</h5>
                          <p>{plan.note || ''}</p>
                        </Link>
                      </div>
                    ))}
                </div>
            </div>
            </TabPanel>
            <TabPanel>
              <div className={style.section_wrapper}>
                <div className={style.wrapper + ' ' + style.wrapper_feed}>
                  <Feed feed={viewer.myAgent.agentEconomicEvents} />
                </div>
              </div>
            </TabPanel>
            </Tabs>
          </div>
        </div>
        </div>
      </div>
      ))}
    </AppTemplate>
  )
}}

const agentPlans = gql`
query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        faircoinAddress
        image
        agentEconomicEvents {
          note
          action
          provider {
            image
            name
          }
          inputOf {
            name
          }
          receiver {
            name
          }
          start
          note
          affectedQuantity {
            numericValue
            unit {
              name
            }
          }
        }
        agentCommitments(latestNumberOfDays: 30) {
          id
          action
          plannedStart
          committedOn
          due
          committedQuantity {
            numericValue
            unit {
              name
            }
          }
          resourceClassifiedAs {
            name
            category
          }
          provider {
            id
            name
          }
          receiver {
            id
            name
          }
          note
        }
        agentRelationships {
          relationship {
            label
            category
          }
          object {
            id
            name
            note
            image
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
    token: localStorage.getItem('token')
}})
})(Lists)
