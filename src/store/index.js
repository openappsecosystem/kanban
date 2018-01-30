import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {flags} from './reducers/flags'
import { reducer as notifReducer } from 'redux-notifications'

export const networkInterface = createNetworkInterface({
  uri: 'https://ocp.freedomcoop.eu/api/graph'
  // uri: 'https://testocp.freedomcoop.eu/api/graph'
})

export const client = new ApolloClient({
  networkInterface,
  // queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
      return result.__typename + result.id // eslint-disable-line no-underscore-dangle
    }
    return null
  },
  initialState: window.__APOLLO_STATE__ // eslint-disable-line no-underscore-dangle
})

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    notifs: notifReducer,
    flags
  }),
  compose(
    applyMiddleware(client.middleware()),
    // eslint-disable-next-line no-underscore-dangle
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
