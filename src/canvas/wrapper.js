import React from 'react'
import { gql, graphql } from 'react-apollo'
import Component from './index'

const plan = gql`
query ($token: String, $planId: Int) {
    viewer(token: $token) {
      plan(id: $planId) {
        id
        name
        planProcesses {
          note
          name
          committedInputs {
            action
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
    }
  }
  
`

export default graphql(plan, {
  options: (props) => {
  return ({variables: {
    token: sessionStorage.getItem('token'),
    planId: props.match.params.id
  }})
}})(Component)
