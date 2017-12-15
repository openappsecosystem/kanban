import React from 'react'
import { gql, graphql } from 'react-apollo'
import Component from './index'
import AppTemplate from '../templates/AppTemplate'

const plan = gql`
query ($token: String, $planId: Int) {
    viewer(token: $token) {
      plan(id: $planId) {
        id
        name
        scope {
          id
          name
        }
        workingAgents {
          id
          image
          name
         }
        planProcesses {
          note
          id
          name
          plannedDuration
          plannedStart
          committedOutputs {
            id
            committedQuantity {
              unit {
                name
              }
              numericValue
            }
            resourceClassifiedAs {
              name
            }
          }
          committedInputs {
            action
            id
            note
            inputOf {
              name
            }
            due
            isFinished
            involvedAgents {
              image
              id
              name
            }
            committedQuantity {
              unit {
                name
              }
              numericValue
            }
            resourceClassifiedAs {
              category
              name
            }
          }
          workingAgents {
            name
          }
          inputs {
            action
            id
            fulfills {
              fulfilledBy {
                provider {
                  name
                  image
                }
                action
                start
                note
                affects {
                  trackingIdentifier
                }
              }
              fulfilledQuantity {
                unit {
                  name
                }
                numericValue
              }
            }
          }
        }
      }
    }
  }
  
`
class CanvasWrapper extends React.Component {
  constructor () {
    super()
    this.state = {
      lists: []
    }   
  }

  render () {
    const {planLoading, planError, data} = this.props
    return (
      <AppTemplate>
        {planLoading ? <strong>Loading...</strong> : (
        planError ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component
            title={data.name || data.planProcesses[0].name}
            project={data.scope}
            outputs={data.planProcesses}
            moveCard={this.moveCard}
            allPlanAgents={data.workingAgents}
            lists={data.planProcesses.map(list => (
              {
                id: Number(list.id),
                title: list.name,
                note: list.note,
                due: list.plannedStart,
                cards: list.committedInputs.map(task => (
                  {
                    id: Number(task.id),
                    title: task.action + ' ' + task.committedQuantity.numericValue + ' ' + task.committedQuantity.unit.name + ' of ' + task.resourceClassifiedAs.name,
                    members: task.involvedAgents,
                    process: task.inputOf.name,
                    due: task.due,
                    note: task.note
                  }
                ))
              }
            ))}
          />
    ))}
    </AppTemplate>
    )
  }
}

export default graphql(plan, {
  options: (props) => ({ variables: {
    token: sessionStorage.getItem('token'),
    planId: props.match.params.id
  }}),
  props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
    planLoading: loading,
    planError: error,
    refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
    data: viewer ? viewer.plan : null
  })
})(CanvasWrapper)
