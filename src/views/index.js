import React from 'react'
import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { authenticated } from '../services/auth'
import { dismissToast } from '../services/toast'

import { Link } from 'react-router'

import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import ListItem from 'react-md/lib/Lists/ListItem'
import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons'
import FontIcon from 'react-md/lib/FontIcons'
import Snackbar from 'react-md/lib/Snackbars'

//  Top-Level UI (Navigation, wrappers, etc)
import './main.scss'
@compose(
  firebaseConnect(),
  connect(
    state => ({
      auth: authenticated(state),
      user: state.firebase.auth,
      errors: state.firebase.errors,
      toasts: state.toasts
    }),
    dispatch => ({ handleDismiss: bindActionCreators(dismissToast, dispatch) })
  )
)
class UI extends React.Component {
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
    { children, auth, user, toasts, handleDismiss } = this.props
  ) {
    const NavProfile = {
      primaryText: auth ? user.displayName : 'You are not Logged In',
      secondaryText: auth ? user.email : 'Click to sign in',
      leftAvatar: auth ? <Avatar src={user.photoURL} role='presentation' /> : null,
      onClick: auth ? this.handleLogout : this.handleLogin
    }
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
        },
        NavProfile,
        // {
        //   primaryText: (auth ? profile.displayName : 'You are not Logged In'),
        //   secondaryText: (auth ? profile.email : 'Click to sign in'),
        //   leftAvatar: (auth ? <Avatar src={profile.avatarUrl} role='presentation' /> : null),
        //   onClick: (auth ? this.handleLogout : this.handleLogin)
        // },
        {
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
        <Snackbar toasts={toasts} autohide
          onDismiss={handleDismiss}
        />
        <footer>
          <h3><em>Built by hackers, for hackers. We are Open-Source</em></h3>
        </footer>
      </NavigationDrawer>
    )
  }
}
export default UI
