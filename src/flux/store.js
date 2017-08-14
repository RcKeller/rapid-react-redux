import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import freeze from 'redux-freeze'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { reactReduxFirebase } from 'react-redux-firebase'
import { keys, config } from './firebase'
import * as firebase from 'firebase'
import { createLogger } from 'redux-logger'
import { reducers } from './reducers.js'
//  Please note, middleware is different from store enhancers

//  Initialize Firebase (done first because async)
firebase.initializeApp(keys)

//  Core middleware
let middlewares = [
  thunk,
  routerMiddleware(browserHistory)
]
//  Dev-only middlewares
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze)
  middlewares.push(createLogger())
}
//  Apply middleware
let middleware = applyMiddleware(...middlewares)

//  Devtools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

//  Create the store, enhanced with responsive reducers (not available as middleware)
export const store = createStore(
  reducers,
  compose(
    responsiveStoreEnhancer,
    reactReduxFirebase(firebase, config),
    middleware
  )
)
export const history = syncHistoryWithStore(browserHistory, store)
