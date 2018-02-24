import {compose, withHandlers, withState} from 'recompose'
import Component from './logEvent'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {queryEvents} from '../modalActivities'
import moment from 'moment'
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
      id
    }
  }
}
`
export default compose(
    graphql(createEvent, {
      options: (props) => ({
        refetchQueries: [
          {
            query: queryEvents,
            variables: {
              token: localStorage.getItem('token'),
              id: props.id
            }
          }
        ]
      }),
      props: ({mutate, ownProps: {id, members}}) => ({
        members, id, mutate
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
        event.preventDefault()
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
  )(Component)
