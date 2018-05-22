import store from 'store'

import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'semantic-ui-css/semantic.min.css'

import registerServiceWorker from './registerServiceWorker'
import configureStore from './reactStore'
import Auth from './components/Auth'

import ACTIONS from './constants/actions'

import App from './containers/App'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Profiles from './pages/Profiles'

import './styles/main.scss'

const reactStore = configureStore()
if (typeof window !== 'undefined') window.debugStore = reactStore

if (store.get('token')) {
  reactStore.dispatch({ type: ACTIONS.AUTH_USER })
} else {
  reactStore.dispatch({ type: ACTIONS.UNAUTH_USER })
}

ReactDOM.render(
  <Provider store={reactStore}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Auth(Home)} />
          <Route path="/profiles" component={Auth(Profiles)} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
