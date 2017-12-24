import { compose, withState } from 'recompose'
import {graphql} from 'react-apollo'
import Modal from './'
import GetCommitment from '../../queries/getCommitment'

export default compose(
  graphql(GetCommitment, {
    options: ({id}) => ({ variables: { token: localStorage.getItem('token'), id: id}}),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading,
      error,
      refetchData: refetch,  // :NOTE: call this in the component to force reload the data
      commitment: viewer ? viewer.commitment : null,
      units: viewer ? viewer.allUnits : null
    }),
  }),
  withState('modalDescription', 'handleModalDescription', null)
)(Modal)
