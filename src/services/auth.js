//  These semi-relative imports are necessary and part of the auth wrapper lib by design.
// import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'
import { routerActions } from 'react-router-redux'
//  Reselect creates efficient, memoized selectors.
import { createSelector } from 'reselect'
import _ from 'lodash'

// const abSelector = (state, props) => state.a * props.b

/* *****
SELECTORS
***** */
 // User loaded and data exists
const getFirebase = state => state.firebase
export const getAuth = createSelector(
  [getFirebase],
  firebase => firebase.auth
)

export const errors = createSelector(
  [getFirebase],
  firebase => firebase.errors
)

export const authenticated = createSelector(
  [getAuth],
  auth => auth.isLoaded && !auth.isEmpty
)

// const firebaseInitialized = state => state.firebase
// const authInitialized = firebase => firebase.auth
// export const authenticated = createSelector(
//   [firebaseInitialized, authInitialized],
//   auth => auth.isLoaded && !auth.isEmpty
// )
  // state => state.firebase,
  // firebase => firebase.auth,
  // auth => auth.isLoaded && !auth.isEmpty

//  Firebase is initializing or auth hasn't loaded.
export const authenticating = createSelector(
  [getFirebase],
  firebase => firebase.isInitializing || !firebase.auth.isLoaded
)
export const unauthenticated = createSelector(
  [getAuth],
  auth => auth.isEmpty || !auth.isLoaded
)
export const user = createSelector(
  [getFirebase],
  firebase => Array.isArray(firebase.profile.providerData)
    ? firebase.profile.providerData[0]
    : firebase.profile.providerData
)
// export const user = (state) => authenticated(state) ? state.firebase.profile.providerData : {}
  // export const authenticating = (state) => state.firebase.isInitializing || !state.firebase.auth.isLoaded
  // export const unauthenticated = (state) => state.firebase.auth.isEmpty || !state.firebase.auth.isLoaded
  // export const user = (state) => authenticated(state) ? state.firebase.profile.providerData : {}
// export const user = (state) => authenticated(state) && state.firebase.auth

//  User loaded and data exists
// export const authenticated = (state) => state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty
// //  Firebase is initializing or auth hasn't loaded.
// export const authenticating = (state) => state.firebase.isInitializing || !state.firebase.auth.isLoaded
// export const unauthenticated = (state) => !state.firebase.auth.isLoaded || state.firebase.auth.isEmpty
// export const user = (state) => authenticated(state) && state.firebase.auth

// const selectFirebase = state => state.firebase
// const selectAuth = createSelector(
//   selectFirebase,
//   firebase => firebase.auth
// )
// export const authenticated = createSelector(
//   selectAuth,
//   auth => auth.isLoaded && !auth.isEmpty
// )
// // export const authenticated = createSelector(
// //   selectFirebase,
// //   firebase => firebase.auth.isLoaded && !firebase.auth.isEmpty
// // )
// //  Firebase is initializing or auth hasn't loaded.
// export const authenticating = createSelector(state => state.firebase.isInitializing || !state.firebase.auth.isLoaded)
// export const unauthenticated = createSelector(state => !state.firebase.auth.isLoaded || state.firebase.auth.isEmpty)
// export const user = createSelector(state => authenticated(state) && state.firebase.auth)

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
