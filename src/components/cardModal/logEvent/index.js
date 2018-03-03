import {compose, withHandlers, withState} from 'recompose'
import Component from './logEvent'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import {withRouter} from 'react-router-dom'

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

const routerComponent = withRouter(Component)

export default compose(
  graphql(createEvent, {
    options: (props) => ({
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
        
        // let commitmentUpdated = agentPlanCache.viewer.plan
        //   .planProcesses[processIndex]
        //   .committedInputs
        //   .filter(input => Number(input.id) === Number(props.id))[0]

        let commitmentUpdatedIndex = agentPlanCache.viewer.plan
          .planProcesses[processIndex]
          .committedInputs
          .findIndex(input => {
            return Number(input.id) === Number(props.id)
          })

        agentPlanCache.viewer.plan
          .planProcesses[processIndex]
          .committedInputs[commitmentUpdatedIndex]
          .fulfilledBy.unshift({
            fulfills: {
              action: data.createEconomicEvent.economicEvent.action,
              __typename: 'Commitment'
            },
            __typename: 'Fulfillment'
          })

        // agentPlanCache.viewer.plan.planProcesses[processIndex].committedInputs[commitmentUpdatedIndex] = commitmentUpdated

        agentEventsCache.viewer.commitment
        .fulfilledBy.unshift({
          fulfilledBy: {
            action: data.createEconomicEvent.economicEvent.action,
            note: data.createEconomicEvent.economicEvent.note,
            provider: data.createEconomicEvent.economicEvent.provider,
            start: data.createEconomicEvent.economicEvent.start,
            id: data.createEconomicEvent.economicEvent.id,
            __typename: "EconomicEvent"
          },
          fulfilledQuantity: data.createEconomicEvent.economicEvent.affectedQuantity,
          __typename: "Fulfillment"
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
  }),
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
      log: ({mutate, id, scopeId, startDate, commitmentId, action, note, numericValue, unitId}) => event => {
        let date = moment(startDate).format("YYYY-MM-DD")
        return (
          mutate({
            variables: {
              token: localStorage.getItem('token'),
              id: id,
              action: action,
              scopeId: scopeId,
              commitmentId: commitmentId,
              note: note,
              affectedNumericValue: numericValue,
              affectedUnitId: unitId,
              start: date
            }
          })
          .then((data) => console.log(data))
          .catch((e) => console.log(e))
        )
      }
    })
  )(routerComponent)
