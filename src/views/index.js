import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'

import { Link } from 'react-router'

import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import ListItem from 'react-md/lib/Lists/ListItem'
import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons'
import FontIcon from 'react-md/lib/FontIcons'

//  Top-Level UI (Navigation, wrappers, etc)
import './main.scss'
@compose(
  firebaseConnect(),
  connect(
    ({ firebase }) => ({
      auth: pathToJS(firebase, 'auth'),
      authError: pathToJS(firebase, 'authError')
    })
  )
)
class UI extends React.Component {
  handleLogin = () => {
    const { firebase } = this.props
    return firebase.login({ provider: 'google' })
  }
  handleLogout = () => {
    const { firebase, router } = this.props
    firebase.logout()
    router.push('/')
  }
  render (
    { children, auth } = this.props
  ) {
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
        }, {
          primaryText: auth ? auth.displayName : 'You are not Logged In',
          secondaryText: auth ? auth.email : 'Click to sign in',
          leftAvatar: auth ? <Avatar src={auth.photoURL} role='presentation' /> : null,
          onClick: auth ? this.handleLogout : this.handleLogin
        }, {
          divider: true
        }]}
        drawerTitle='Navigation'
        toolbarTitle={
          <Link to='/' className='toolbar-title'>
            <img src='/img/logo.svg' alt='Site Logo' />
            <h2>{`Site Title`}</h2>
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
        <footer>
          <h3><em>Built by hackers, for hackers. We are Open-Source</em></h3>
        </footer>
      </NavigationDrawer>
    )
  }
}
export default UI
