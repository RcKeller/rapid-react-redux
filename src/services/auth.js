//  These semi-relative imports are necessary and part of the auth wrapper lib by design.
// import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'
import { routerActions } from 'react-router-redux'
//  Reselect creates efficient, memoized selectors.
import { createSelector } from 'reselect'
import _ from 'lodash'

// const abSelector = (state, props) => state.a * props.b

/* *****
SELECTORS (Can be used as an export, but you probably should use flux/selectors for multiple imports)
***** */
const getFirebase = state => state.firebase

//  AUTHENTICATING: Firebase is initializing or auth hasn't loaded.
export const authenticating = createSelector(
  [getFirebase],
  firebase => firebase.isInitializing || !firebase.auth.isLoaded
)
//  AUTHENTICATED: Loaded and isn't empty
export const authenticated = createSelector(
  [getFirebase],
  firebase => firebase.auth.isLoaded && !firebase.auth.isEmpty
)
//  UNAUTHENTICATED: No auth data or auth hasn't loaded
export const unauthenticated = createSelector(
  [getFirebase],
  firebase => firebase.auth.isEmpty || !firebase.auth.isLoaded
)

/* *****
ROUTE DECORATORS
https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/react-router-3/auth.js
***** */
const home = '/'
export const requireAuth = connectedRouterRedirect({
  redirectPath: home,
  authenticatedSelector: authenticated,
  authenticatingSelector: authenticating,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'requireAuth'
})

export const requireNotAuth = connectedRouterRedirect({
  redirectPath: home,
  allowRedirectBack: false,
  //  Redirect users who ARE authenticated
  authenticatedSelector: unauthenticated,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'requireNotAuth'
})
