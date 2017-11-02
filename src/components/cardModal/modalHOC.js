import React from 'react'
import { compose, withState, withHandlers } from 'recompose';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import Modal from './'

const getCommitment = gql`
query ($token: String, $id: Int!) {
    viewer(token: $token) {
      commitment(id: $id) {
        action
        id
        note
        scope {
          id
        }
        provider {
          id
          name
          image
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
    }
    viewer(token: $token) {
      allUnits {
        id
        name
        symbol
      }
    }
  }
`

export default compose(
  graphql(getCommitment, {
    options: ({id}) => ({ variables: { token: sessionStorage.getItem('token'), id: id}}),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading,
      error,
      refetchData: refetch,  // :NOTE: call this in the component to force reload the data
      commitment: viewer ? viewer.commitment : null,
      units: viewer ? viewer.allUnits : null
    }),
  }),
)(Modal)