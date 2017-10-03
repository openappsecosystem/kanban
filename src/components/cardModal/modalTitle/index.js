import React from 'react'
import { compose, withState, withHandlers } from 'recompose';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import ModalTitle from './modalTitle'

const updateCommitment = gql`
    mutation ($token: String!, $id: Int!, $note: String, $due: String, $isFinished: Boolean ) {
        updateCommitment(token: $token, note: $note, id: $id, due: $due, isFinished:$isFinished ) {
        commitment {
            id
            note
            isFinished,
            due
        }
        }
    }
`

export default compose(
  graphql(updateCommitment, {
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