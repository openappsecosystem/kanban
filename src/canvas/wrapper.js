import React from 'react'
import AppTemplate from '../templates/AppTemplate'
import Component from './index'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
                numericValue
              }
              fulfills {
                action
                fulfilledBy{
                  fulfilledBy {
                    requestDistribution
                  }
                }
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
            id
            image
          }
          inputs {
            action
            id
            fulfills {
              fulfilledBy {
                requestDistribution
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
    const {loading, error, viewer} = this.props
    return (
      <AppTemplate>
        {loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component data={viewer} param={this.props.match.params.id} />
        ))}
      </AppTemplate>
    )
  }
}

export default graphql(plan, {
  options: (props) => ({ 
    variables: {
      token: localStorage.getItem('token'),
      planId: Number(props.match.params.id)
    }
  }),
  props: ({ ownProps, data: { viewer, loading, error, refetch } }) => {
    return ({
      loading: loading,
      error: error,
      viewer: viewer ? viewer.plan : null
  })}
})(CanvasWrapper)
