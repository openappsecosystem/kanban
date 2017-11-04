import {compose, withHandlers} from 'recompose'
import Component from './listTemplate'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const createCommitment = gql`
mutation ($token: String!, $action: String! , $due: String!, $note: String, $committedResource: Int, $committedNumeric: String, $committedUnit; Int, $inputOf: Int, $planId: Int) {
    createCommitment(
      token: $token,
      action: $action,
      due: $due,
      note: $note,
      committedResourceClassifiedAsId: $committedResource ,
      committedNumericValue: $committedNumeric,
      committedUnitId: $committedUnit,
      inputOfId: $inputOf,
      planId: $planId
    ) {
      commitment {
        id
      }
    }
  }
`

// export const queryEvents = gql`
// query ($token: String!, $id: Int!) {
//     viewer(token: $token) {
//         commitment(id: $id) {
//           id
//           fulfilledBy {
//             fulfilledBy {
//               action
//               start
//               id
//               note
//               provider {
//                 name
//                 image
//                 id
//               }
//             }
//             fulfilledQuantity {
//               numericValue
//               unit {
//                 name
//               }
//             }
//           }
//         }
//     }
// }
// `

export default compose(
    graphql(createCommitment, {
    //   options: (props) => ({
    //     refetchQueries: [
    //       {
    //         query: queryEvents,
    //         variables: {
    //           token: sessionStorage.getItem('token'),
    //           id: props.id
    //         }
    //       }
    //     ]
    //   }),
      props: ({mutate, ownProps: {id}}) => ({
        id, mutate
      })
    }),
    // graphql(queryEvents, {
    //   options: ({id}) => ({ variables: { token: sessionStorage.getItem('token'), id: id}}),
    //   props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
    //     loading,
    //     error,
    //     refetchData: refetch,  // :NOTE: call this in the component to force reload the data
    //     activities: viewer ? viewer.commitment.fulfilledBy : null
    //   })
    // }),
    withHandlers({
      deleteEvent: ({mutate}) => (id) => {
        return (
          mutate({
            variables: {
              token: sessionStorage.getItem('token'),
              id: id
            }
          })
          .then((data) => console.log('cancellados'))
          .catch((e) => console.log(e))
        )
      }
    })
  )(Component)
