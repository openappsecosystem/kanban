import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './login'
import ResourcesFlow from './resourcesFlow'
import Canvas from './canvas/wrapper'
import StatusFlow from './statusFlow'
import Agent from './agent/wrapper'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import {client, store} from './store'

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={App} />
        <Route exact path='/agent/:id' component={Agent} />
        <Route exact path='/canvas/:id' component={Canvas} />
      </div>
    </Router>
  </ApolloProvider>,
document.getElementById('root')
)
registerServiceWorker()

// {/* <Route exact component={StatusFlow} />
// <Route exact path='/resources-flow' component={ResourcesFlow} /> */}
// {/* </Route> */}
