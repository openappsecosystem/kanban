import React from 'react'
import AppTemplate from '../templates/AppTemplate'
import Component from './index'
import { gql, graphql } from 'react-apollo'

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
            fulfilledBy {
              fulfilledQuantity {
                unit{
                  name
                }
                numericValue
              }
              fulfills {
                action
              }
            }
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
    planId: props.match.params.id
  }}),
  props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
    loading: loading,
    error: error,
    refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
    data: viewer ? viewer.plan : null
  })
})(CanvasWrapper)