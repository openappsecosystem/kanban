import {compose, withHandlers, withState} from 'recompose'
import Component from './logEvent'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import {connect} from 'react-redux'
import { actions as notifActions } from 'redux-notifications'

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
            id
            image
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

export const queryEvents = gql`
query ($token: String!, $id: Int!) {
    viewer(token: $token) {
        commitment(id: $id) {
          id
          fulfilledBy {
            fulfilledBy {
              action
              start
              id
              note
              provider {
                id
                name
                image
              }
            }
            fulfilledQuantity {
              numericValue
              unit {
                name
              }
            }
          }
        }
    }
}
`

const createEvent = gql`
mutation ($token: String!, $action: String!, $start: String, $scopeId: Int!, $commitmentId: Int!, $note: String, $affectedNumericValue: String!, $affectedUnitId: Int!  ) {
  createEconomicEvent(
    token: $token,
    action: $action,
    start: $start,
    scopeId: $scopeId, 
    fulfillsCommitmentId: $commitmentId,
    note: $note,
    affectedNumericValue: $affectedNumericValue, 
    affectedUnitId: $affectedUnitId, 
    ) {
    economicEvent {
      action
      note
      start
      id
      scope {
        id
      }
      provider {
        name
        id
        image
      }
      affectedQuantity {
        unit {
          name
        }
        numericValue
      }
    }
  }
}
`


const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  const sendNotif = (id, message, kind, dismissAfter) => {
    notifActions.notifSend({
      message,
      kind,
      id: id,
      dismissAfter: 2000
    })(dispatch)
  }
  return {
    sendNotif
  }
}


const wrapperComponent = compose(
  graphql(createEvent, {}),
  withState('action', 'updateAction', 'work'),
  withState('note', 'updateNote', ''),
  withState('numericValue', 'updateNumericValue', '0'),
  withState('unitId', 'updateUnitId', 2),
  withState('startDate', 'updateDate', moment()),
  withHandlers({
    addNote: props => event => {
      event.preventDefault()
      props.updateNote(event.target.value)
    },
    addAction: props => event => {
      event.preventDefault()
      props.updateAction(event.target.value)
    },
    addNumericValue: props => event => {
      event.preventDefault()
      props.updateNumericValue(event.target.value)
    },
    addDate: props => event => {
      props.updateDate(event)
    },
    addUnitId: props => event => {
      event.preventDefault()
      props.updateUnitId(event.target.value)
    },
    log: props => event => {
      let date = moment(props.startDate).format("YYYY-MM-DD")
      return (
        props.mutate({
          variables: {
            token: localStorage.getItem('token'),
            id: props.id,
            action: props.action,
            scopeId: props.scopeId,
            commitmentId: props.commitmentId,
            note: props.note,
            affectedNumericValue: props.numericValue,
            affectedUnitId: props.unitId,
            start: date
          },
          // options: (props) => ({
          update: (store, { data }) => {
            let agentPlanCache = store.readQuery({ query: plan,
              variables: {
                token: localStorage.getItem('token'),
                planId: Number(props.param)
              }}
            )
    
            let agentEventsCache = store.readQuery({ query: queryEvents,
              variables: {
                token: localStorage.getItem('token'),
                id: Number(props.id)
              }}
            )
            
            let processIndex = agentPlanCache.viewer.plan.planProcesses.findIndex(process => process.committedInputs.some(item => Number(item.id) === Number(props.id)))
            
            let commitmentUpdatedIndex = agentPlanCache.viewer.plan
              .planProcesses[processIndex]
              .committedInputs
              .findIndex(input => {
                return Number(input.id) === Number(props.id)
              })
    
            agentPlanCache.viewer.plan.planProcesses[processIndex].committedInputs[commitmentUpdatedIndex]
            .fulfilledBy.unshift({
              fulfills: {
                action: data.createEconomicEvent.economicEvent.action,
                __typename: 'Commitment'
              },
              __typename: 'Fulfillment'
            })
    
            agentEventsCache.viewer.commitment
            .fulfilledBy.unshift({
              fulfilledBy: {
                action: data.createEconomicEvent.economicEvent.action,
                note: data.createEconomicEvent.economicEvent.note,
                provider: data.createEconomicEvent.economicEvent.provider,
                start: data.createEconomicEvent.economicEvent.start,
                id: data.createEconomicEvent.economicEvent.id,
                __typename: 'EconomicEvent'
              },
              fulfilledQuantity: data.createEconomicEvent.economicEvent.affectedQuantity,
              __typename: 'Fulfillment'
            })
    
            store.writeQuery({ query: plan,
              variables: {
                token: localStorage.getItem('token'),
                id: props.param
              },
              data: agentPlanCache })
    
            store.writeQuery({ query: queryEvents,
              variables: {
                token: localStorage.getItem('token'),
                id: props.id
              },
              data: agentEventsCache })
          }
        })
        // })
        .then((data) => props.sendNotif(Math.random(), '✌️✌️✌️ Work logged correctly', 'success', '5000'))
        .catch((e) => props.sendNotif(Math.random(), e.message, 'danger', '5000'))
      )
    }
  })
)(Component)

export default connect(mapStateToProps, mapDispatchToProps)(wrapperComponent)
