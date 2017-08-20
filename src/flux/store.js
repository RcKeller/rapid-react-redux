/* *****
STORE CREATION
  This adds a bunch of middleware and enhancements:
  - redux-thunk: The ability to use async redux actions by returning a function (see our reducers)
  - react-router-redux: Emits actions on route changes
  - redux-responsive: Safe, performant reducer for tracking window state and changes
  - react-redux-firebase: A new, experimental package - connects store to FB, gives thunks helpers for FB actions
  - redux-logger: Out of production, console.logs state changes, good if you haven't installed Redux Devtools yet.

NOTE: Middleware is different from store enhancers
  If you want a bad time, try altering this file.
***** */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { createLogger } from 'redux-logger'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reducers } from './reducers.js'

//  Initialize Firebase w/ API keys (Yes, these imports are on purpose)
import keys from './firebase'
import * as firebase from 'firebase'
firebase.initializeApp(keys)

//  Dynamically set middlewares and apply.
let middlewares = [
  thunk.withExtraArgument(getFirebase),
  routerMiddleware(browserHistory)
]
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger())
}
let middleware = applyMiddleware(...middlewares)

//  Connect Devtools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

//  Create store
export const store = createStore(
  reducers,
  compose(
    responsiveStoreEnhancer,
    reactReduxFirebase(firebase, {
      userProfile: 'users',
      enableLogging: false
    }),
    middleware
  )
)
export const history = syncHistoryWithStore(browserHistory, store)
