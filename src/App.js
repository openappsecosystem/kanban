import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import style from './App.css'
import { Link } from 'react-router-dom'
import AppTemplate from './templates/AppTemplate'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Feed from './components/feed/feed'
import Cards from './components/cards'

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
        <h2 className={style.profile_title}><span role='img'>👋</span> Hello {viewer.myAgent.name}</h2>
        <h5 className={style.profile_address}>ƒ <span>{viewer.myAgent.faircoinAddress}</span></h5>
        <div className={style.section}>
          <div className={style.section_wrapper}>
          <Tabs selectedTabClassName={style.list_active}>
          <TabList className={style.scope_list}>
              <Tab>Overview</Tab>
              <Tab>Diary</Tab>
          </TabList>
          <TabPanel>
            <div className={style.wrapper}>
                <Cards
                  data={viewer.myAgent.agentPlans}
                  link='canvas'
                />
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
          requestDistribution
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
          due
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

export default graphql(agentPlans, {
  options: (props) => ({variables: {
    token: localStorage.getItem('token')
}})
})(Lists)
