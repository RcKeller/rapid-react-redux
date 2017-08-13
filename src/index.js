import React from 'react'
import ReactDOM from 'react-dom'
//  FLUX / REDUX wrappers
import { Provider } from 'react-redux'
import { store, history } from './flux/store'
//  ROUTING
import { Router, Route, IndexRoute } from 'react-router'
//  INTERFACE
import UI from './views'

//  PAGES
import Home from './views/Home/Home'
import NotFound from './views/NotFound/NotFound'

 // RENDER ROOT
 // Update and add new routes as necessary
ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path='/' component={UI}>
        <IndexRoute component={Home} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
