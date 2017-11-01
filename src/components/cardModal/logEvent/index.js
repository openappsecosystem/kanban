import {compose, withHandlers} from 'recompose'
import Component from './logEvent'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const updateCommitment = gql`
mutation ($token: String!, $id: Int!, $providerId: Int!) {
    updateCommitment(token: $token, providerId: $providerId, id: $id) {
    commitment {
        id
        provider {
            id
            name
            image
        }
    }
    }
}
`
export default compose(
    graphql(updateCommitment, {
      props: ({mutate, ownProps: {id, members}}) => ({
        members, id, mutate
      })
    }),
    withHandlers({
      logEvent: ({mutate, id, members, allPlanAgents}) => (event) => {
        return (
          mutate({
            variables: {
              token: sessionStorage.getItem('token'),
              id: id,
              providerId: event.target.id
            }
          })
          .then((data) => console.log('hole'))
          .catch((e) => console.log(e))
        )
      }
    })
  )(Component)