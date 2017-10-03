import React from 'react'
import { compose, withState, withHandlers } from 'recompose';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import ModalMembers from './modalMembers'

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
  withState('isVisible', 'toggleVis', false),
  withHandlers({
    toggleVisibility: ({ toggleVis, isVisible }) => (event) => toggleVis(!isVisible),
    // editMembers: ({mutate, id, members, allPlanAgents}) => (event) => {
    //   let membersId = members.map(m => m.id)
    //   let workingAgents
    //   if (membersId.indexOf(event.target.id) === -1) {
    //     console.log('ID non presente, va aggiunto')
    //     const newMember = allPlanAgents.filter(a => a.id === event.target.id)[0]
    //     workingAgents = [...members, newMember]
    //   } else {
    //     console.log('id gia presente, eliminiamolo')
    //     workingAgents = members.slice(membersId.indexOf(event.target.id), 1)
    //   }
    //   console.log(workingAgents)
    //   return (
    //     mutate({
    //       variables: {
    //         token: sessionStorage.getItem('token'),
    //         id: id,
    //         involvedAgents: workingAgents
    //       }
    //     })
    //     .then((data) => console.log(data.data.updateCommitment.commitment.involvedAgents))
    //     .catch((e) => console.log(e))
    //   )
    // }
    editProvider: ({mutate, id, members, allPlanAgents}) => (event) => {
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
)(ModalMembers)
