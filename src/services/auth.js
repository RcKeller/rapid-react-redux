import { browserHistory } from 'react-router'
import { pathToJS } from 'react-redux-firebase'
import { UserAuthWrapper } from 'redux-auth-wrapper'

const UserIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'isInitializing') === true ||
    pathToJS(firebase, 'auth') === undefined,
  predicate: auth => auth !== null,
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
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) => pathToJS(firebase, 'isInitializing') === true,
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
