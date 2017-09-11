import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './login'
import Canvas from './canvas/wrapper'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'

const networkInterface = createNetworkInterface({
  // https://api.graph.cool/simple/v1/cj412r3kp9mz50177whe5r5qf looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
  // uri: 'https://api.graph.cool/simple/v1/cj412r3kp9mz50177whe5r5qf'
  uri: 'http://localhost:8000/api/graph'
})
  
const client = new ApolloClient({networkInterface})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={App} />
        <Route exact path='/canvas/:id' component={Canvas} />
      </div>
    </Router>
  </ApolloProvider>,
document.getElementById('root'),
)
registerServiceWorker()
