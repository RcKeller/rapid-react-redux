import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'
import { routerActions } from 'react-router-redux'
const home = '/'

/* *****
SELECTORS
***** */
export const authenticated = (state) => state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty
//  Loading: Firebase is initializing or auth hasn't loaded.
export const authenticating = (state) => state.firebase.isInitializing || !state.firebase.auth.isLoaded
export const unauthenticated = (state) => !state.firebase.auth.isLoaded || state.firebase.auth.isEmpty

/* *****
AUTH ROUTING DECORATORS
https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/react-router-3/auth.js
***** */
export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: home,
  authenticatedSelector: authenticated,
  authenticatingSelector: authenticating,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const UserIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: home,
  allowRedirectBack: false,
  //  Redirect users who ARE authenticated
  authenticatedSelector: unauthenticated,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated'
})
