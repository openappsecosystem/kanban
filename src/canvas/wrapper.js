import React from 'react'
import { gql, graphql } from 'react-apollo'
import Component from './index'

const plan = gql`
query ($token: String, $planId: Int) {
    viewer(token: $token) {
      plan(id: $planId) {
        id
        name
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
  render () {
    const {loading, error, data} = this.props
    console.log(data)
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component
            title={data.name || 'no name'}
            outputs={data.planProcesses}
            lists={data.planProcesses.map(list => (
              {
                id: Number(list.id),
                title: list.name,
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
    )))
  }
}

export default graphql(plan, {
  options: (props) => ({ variables: {
    token: sessionStorage.getItem('token'),
    planId: props.match.params.id
  }}),
  props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
    loading,
    error,
    refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
    data: viewer ? viewer.plan : null
  })
})(CanvasWrapper)
