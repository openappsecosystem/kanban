import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './login'
import Canvas from './canvas/wrapper'
import Agent from './agent/wrapper'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'
const networkInterface = createNetworkInterface({
  // uri: 'https://ocp.freedomcoop.eu/api/graph'
  uri: 'https://testocp.freedomcoop.eu/api/graph'
})

const client = new ApolloClient({networkInterface})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={App} />
        <Route exact path='/canvas/:id' component={Canvas} />
        <Route exact path='/agent/:id' component={Agent} />
      </div>
    </Router>
  </ApolloProvider>,
document.getElementById('root')
)
registerServiceWorker()
