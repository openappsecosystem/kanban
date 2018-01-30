import React from 'react'
import AppTemplate from '../templates/AppTemplate'
import Component from './index'
import { gql, graphql } from 'react-apollo'
import {compose, withHandlers, withState} from 'recompose'
import {connect} from 'react-redux'
import { actions as notifActions } from 'redux-notifications'

const agent = gql`
query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        image
        email
        note
        primaryLocation {
            name
        }
      }
    }
  } 
`

const updateSettings = gql`
mutation ($token: String!, $note: String, $id: Int!, $name: String,  $email: String, $image: String ) {
  updatePerson(
    token: $token,
    id: $id,
    note: $note,
    email: $email
    name: $name,
    image: $image
  ) {
    person {
      id
      name
      note
      image
    }
  }
}`

class SettingsWrapper extends React.Component {
  render () {
    const {loading, error, data, updateImage, updateBio, saveSettings, updateLocation, updateName} = this.props
    return (
      <AppTemplate>
        {loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
            <Component
              data={data}
              updateImage={updateImage}
              updateLocation={updateLocation}
              updateName={updateName}
              updateBio={updateBio}
              saveSettings={saveSettings}
            />
        ))}
      </AppTemplate>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
    const sendNotif = (id, message, kind, dismissAfter) => {
        notifActions.notifSend({
            message,
            kind,
            id: id,
            dismissAfter: 2000
        })(dispatch)
    }
    return {
        sendNotif
    }
}


const WrapperConnected = compose(
    graphql(agent, {
      options: (props) => ({ variables: {
        token: localStorage.getItem('token')
      }}),
      props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
        loading: loading,
        error: error,
        refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
        data: viewer ? viewer.myAgent : null
      })}),
    graphql(updateSettings, {
      options: (props) => ({
        variables: {
          token: localStorage.getItem('token')
        }
      }),
      props: ({ mutate, ownProps: {name, image, note, primaryLocation} }) => ({
        mutate, name, image, note, primaryLocation
      })}),
      withState('image', 'updateImage', ''),
      withState('name', 'updateName', ''),
      withState('email', 'updateEmail', ''),
      withState('bio', 'updateBio', ''),
      withState('location', 'updateLocation', ''),
      withHandlers({
        updateImage: props => event => {
          event.preventDefault()
          props.updateImage(event.target.value)
        },
        updateName: props => event => {
          event.preventDefault()
          props.updateName(event.target.value)
        },
        updateEmail: props => event => {
          event.preventDefault()
          props.updateEmail(event.target.value)
        },
        updateBio: props => event => {
          event.preventDefault()
          props.updateBio(event.target.value)
        },
        updateLocation: props => event => {
          event.preventDefault()
          props.updateLocation(event.target.value)
        },
        saveSettings: (props) => () => {
          return (
              props.mutate({
                variables: {
                  id: props.data.id,
                  name: props.name,
                  email: props.email,
                  image: props.image,
                  note: props.bio
                }
              })
              .then((data) => props.sendNotif(Math.random(), '✌️✌️✌️ Settings updated correctly', 'success', '5000'))
              .catch((e) => props.sendNotif(Math.random(), e.message, 'danger', '5000'))
          )
        }
    })
)(SettingsWrapper)

export default connect(mapStateToProps, mapDispatchToProps)(WrapperConnected)
