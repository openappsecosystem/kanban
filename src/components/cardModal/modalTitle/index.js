import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import {graphql} from 'react-apollo'
import UpdateCommitmentTitle from '../../../mutations/updateCommitmentTitle'
import ModalTitle from './modalTitle'

export default compose(
  graphql(UpdateCommitmentTitle, {
    props: ({mutate, ownProps: {id, note}}) => ({
    mutate: mutate,
    id: id,
    note: note
    })
  }),
  withState('isVisible', 'toggleVis', false),  
  withHandlers({
      toggleVisibility: ({ toggleVis, isVisible }) => (event) => toggleVis(!isVisible)
    }),
  withHandlers({
    editTitle: ({mutate, id, note}) => (event) => mutate({
        variables: {
            token: sessionStorage.getItem('token'),
            id: id,
            note: event.target.value
        }
    })
    .then((data) => {
        console.log(data.data.updateCommitment.commitment.note)

    }).catch((e) => {
        console.log(e)
    })
  })
)(ModalTitle)