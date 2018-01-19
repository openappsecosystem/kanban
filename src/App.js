import React from 'react'
import { gql, graphql } from 'react-apollo'
import style from './App.css'
import { Link } from 'react-router-dom'
import AppTemplate from './templates/AppTemplate'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Feed from './components/feed/feed'

const Lists = ({data}) => {
  const {viewer, loading, error} = data
  return (
    <AppTemplate>
      {loading ? <strong>Loading...</strong> : (
      error ? <p style={{ color: '#F00' }}>API error</p> : (
      <div className={style.profile_lists}>
      <div className={style.lists}>
        <div className={style.profile_photo}><img src={viewer.myAgent.image} /></div>
        <div className={style.profile_info}>
          <h2 className={style.profile_title}>{viewer.myAgent.name}</h2>
          {/* <h5 className={style.profile_social}><span /> <a target='blank' href='https://t.me/Bernin1'>@bernin1</a></h5> */}
        </div>
        {/* <h2 className={style.profile_title}>👋 Hello {viewer.myAgent.name}</h2> */}
        <div className={style.section}>
          <div className={style.section_wrapper}>
          <Tabs selectedTabClassName={style.list_active}>
          <TabList className={style.scope_list}>
              <Tab>Recent</Tab>
              <Tab>Projects</Tab>
              <Tab>Resources</Tab>
          </TabList>
          <TabPanel>
              <Feed feed={viewer.myAgent.agentEconomicEvents} />
            </TabPanel>
            <TabPanel>
              <div className={style.section_wrapper}>
                  <div className={style.wrapper}>
                    {viewer.myAgent.agentRelationships.map((org, i) => (
                      <div key={i} className={style.lists_item}>
                        <Link key={i} to={'/agent/' + org.object.id} className='link'>
                          <h4 className={style.item_title}>{org.object.name}</h4>
                            <h5 className={style.plan_scope}>{org.relationship.category}</h5>
                            {/* <div className={style.item_info}>
                              <h6>12 Plans</h6>
                              <h6>36 Members</h6>
                            </div> */}
                        </Link>
                      </div>
                    ))}
                  </div>
              </div>
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
            </TabPanel>
            <TabPanel>
            <div className={style.resources_list}>
                {viewer.myAgent.ownedEconomicResources.map((item, i) => (
                    <div key={i} className={style.list_item}>
                      <div className={style.item_desc}>
                        <span>{item.currentQuantity.numericValue + ' ' + item.currentQuantity.unit.name }</span> of <b>{item.resourceClassifiedAs.name}</b>
                      </div>
                      <div className={style.type}>{item.resourceClassifiedAs.category}</div>
                    </div>
                  ))}
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
}

const agentPlans = gql`
query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        image
        ownedEconomicResources {
          resourceClassifiedAs {
            name
            category
          }
          currentQuantity {
            numericValue
            unit {
              name
            }
          }
        }
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
    token: localStorage.getItem('token')
}})
})(Lists)
