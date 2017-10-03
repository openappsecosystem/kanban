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
        fulfilledBy {
          fulfilledBy {
            action
            start
            note
            provider {
              name
              image
              id
            }
          }
          fulfilledQuantity {
            numericValue
            unit {
              name
            }
          }
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
  }
`

// modalIsOpen: false,
// date: null,
// focused: false,
// modalSelected: this.props.modalSelected,
// modalDescription: false,
// memberPopup: false,
// processPopup: false,
// note: this.props.data.note,
// showInputTitle: false


const Loader = () => (<h1>Loading...</h1>)

export default compose(
  graphql(getCommitment, {
      options: ({id}) => {
          return ({
          variables: {
              token: sessionStorage.getItem('token'),
              id: id
          }
      })},
      props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
        loading,
        error,
        refetchData: refetch,  // :NOTE: call this in the component to force reload the data
        data: viewer ? viewer.commitment : null
      }),
  }),
)(Modal)