import { gql, graphql } from 'react-apollo'

const editCommittmentNote = gql`
mutation ($token: String!, $id: Int!, $note: String! ) {
    updateCommitment(token: $token, note: $note, id: $id) {
      commitment {
        id
        note
      }
    }
  }
`

export default graphql(editCommittmentName, {options: (props) => ({ variables: {
    token: sessionStorage.getItem('token'),
    id,
    note
}})})



this.props.mutation(id, note).
then(res => atcion())