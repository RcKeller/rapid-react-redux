import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import freeze from 'redux-freeze'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from './firebase'
import { createLogger } from 'redux-logger'
import { reducers } from './reducers.js'

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
//  Apply
let middleware = applyMiddleware(...middlewares)

//  Devtools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

//  Create the store, enhanced with responsive reducers (not available as middleware)
const store = createStore(
  reducers,
  compose(
    responsiveStoreEnhancer,
    reactReduxFirebase(firebase, { userProfile: 'users', enableLogging: false }),
    middleware
  )
)
const history = syncHistoryWithStore(browserHistory, store)

export { store, history }


// // Add redux Firebase to compose
// const createStoreWithFirebase = compose(
//   reactReduxFirebase(config, { userProfile: 'users' }),
// )(createStore)
//
// // Create store with reducers and initial state
// const store = createStoreWithFirebase(rootReducer, initialState)
