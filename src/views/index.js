import React from 'react'
import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { authenticated, user } from '../services/auth'
import { dismissToast } from '../services/toasts'

import { Link } from 'react-router'

import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons'
import FontIcon from 'react-md/lib/FontIcons'
import Snackbar from 'react-md/lib/Snackbars'

import { createSelector } from 'reselect'
import _ from 'lodash'

const getFirebase = state => state.firebase
const getAuth = firebase => firebase.auth

const test = createSelector(
  [getFirebase, getAuth],
  auth => auth.isLoaded
)


//  Top-Level UI (Navigation, wrappers, etc)
// import './main.scss'
@compose(
  firebaseConnect(),
  connect(
    state => ({
      test: test(state),
      authenticated: authenticated(state),
      // user:  authenticated(state) && state.firebase.auth,

      // user: user(state),
      user: state.firebase ? state.firebase.auth : {},
      errors: state.firebase.errors,
      toasts: state.toasts
    }),
    dispatch => ({ handleDismiss: bindActionCreators(dismissToast, dispatch) })
  )
)
class UI extends React.Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    }),
    user: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string,
      photoURL: PropTypes.string
    }),
    errors: PropTypes.array,
    toasts: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      action: PropTypes.string
    }))
  }
  handleLogin = () => {
    const { firebase } = this.props
    firebase.login({ provider: 'google' })
  }
  handleLogout = () => {
    const { firebase, router } = this.props
    firebase.logout()
    router.push('/')
  }
  render (
    { children, authenticated, user, toasts, handleDismiss } = this.props
  ) {
    console.warn('USER', authenticated, user)
    return (
      <NavigationDrawer autoclose
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
        navItems={[{
          primaryText: 'Home',
          secondaryText: 'Main Page',
          leftIcon: <FontIcon>home</FontIcon>,
          component: Link,
          to: '/'
        }, {
          primaryText: 'Demo Page',
          secondaryText: 'Typography Demo',
          leftIcon: <FontIcon>school</FontIcon>,
          component: Link,
          to: '/demo'
        }, {
          divider: true
        },{
          primaryText: user ? user.displayName : 'You are not Logged In',
          secondaryText: user ? user.email : 'Click to sign in',
          leftAvatar: user ? <Avatar src={user.photoURL} role='presentation' /> : null,
          onClick: user ? this.handleLogout : this.handleLogin
        }, {
          divider: true
        }]}
        drawerTitle='Navigation'
        toolbarTitle={
          <Link to='/' className='toolbar-title'>
            <img src='/img/logo.svg' alt='Site Logo' />
            <h2>Crypto Chat</h2>
          </Link>
        }
        toolbarActions={
          <Button key='github' secondary icon
            iconClassName='fa fa-github'
            href='https://github.com/RcKeller/'
          />
        }
      >
        <div>{children}</div>
        <Snackbar toasts={toasts} autohide onDismiss={handleDismiss} />
        <footer className='md-paper md-paper--1'>
          <a href='https://github.com/RcKeller/rapid-react-redux'><h4>Built using Rapid-React-Redux, Open-Source on GitHub</h4></a>
        </footer>
      </NavigationDrawer>
    )
  }
}
export default UI
