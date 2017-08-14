import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'

const UserIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  authSelector: (state => state.firebase.auth),
  authenticatingSelector: (state => {
    state.firebase.isInitializing === true ||
    state.firebase.auth === undefined
  }),
  predicate: (auth => auth !== null),
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc)
    // routerActions.replace // if using react-router-redux
    dispatch({
      type: 'UNAUTHED_REDIRECT',
      payload: { message: 'You must be authenticated.' }
    })
  }
})

const UserIsNotAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  failureRedirectPath: '/',
  authSelector: (state => state.firebase.auth),
  authenticatingSelector: (state => state.firebase.isInitializing === true),
  predicate: auth => auth === null,
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc)
    dispatch({
      type: 'AUTHED_REDIRECT',
      payload: { message: 'User is authenticated. Redirecting home...' }
    })
  }
})
export { UserIsAuthenticated, UserIsNotAuthenticated }
