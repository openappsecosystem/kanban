import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './login'
import Canvas from './canvas/wrapper'
import Settings from './settings/wrapper'
import Agent from './agent/wrapper'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import {client, store} from './store'
import { Notifs } from 'redux-notifications'
import style from './base.css'
// import 'kanban-webcomponent'

function CustomNotif (props) {
  let type
  if (props.kind === 'danger') { type = style.danger } else
  if (props.kind === 'info') { type = style.info } else
  if (props.kind === 'warning') { type = style.warning } else
  if (props.kind === 'success') { type = style.success }
  return (
    <div className={style.notification + ' ' + type}>
      <h5><span>{props.kind}</span>{props.message}</h5>
    </div>
  )
}

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <div>
        <Notifs
          CustomComponent={CustomNotif}
          onActionClick={id => this.dismiss(id)}
          actionLabel="close" 
        />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={App} />
        <Route exact path='/agent/:id' component={Agent} />
        <Route exact path='/canvas/:id' component={Canvas} />
        <Route exact path='/settings' component={Settings} />
      </div>
    </Router>
  </ApolloProvider>,
document.getElementById('root')
)
registerServiceWorker()

// {/* <Route exact component={StatusFlow} />
// <Route exact path='/resources-flow' component={ResourcesFlow} /> */}
// {/* </Route> */}
