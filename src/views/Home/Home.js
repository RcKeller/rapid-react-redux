import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { UserIsAuthenticated } from '../../services/auth'

import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardActions from 'react-md/lib/Cards/CardActions'
import CardText from 'react-md/lib/Cards/CardText'
import Media, { MediaOverlay } from 'react-md/lib/Media'
import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons'

@compose(
  firebaseConnect(),
  connect(state => ({ auth: state.firebase.auth }))
)
class Home extends React.Component {
  handleAddRoom = () => {
    const { firebase, auth, router } = this.props
    if (auth) {
      let room = { owner: auth.uid, messages: [] }
      firebase.pushWithMeta('/rooms', room)
      //  FIXME: The API has an onComplete param, but doesn't have a standard promise interface?
      .then(() => console.log('Successfully created room', room))
      .catch((err) => {
        console.log('Error creating room:', err)
      })
    } else {
      console.warn('Cannot create rooms as anonymous.')
    }
}
  render () {
    return (
      <article>
        <Card className='md-grid md-cell--8'>
          <Media>
            <img src='/img/banner.png' role='presentation' />
            <MediaOverlay>
              <CardTitle title='Welcome to Crypto Chat' subtitle='Rapid-React-Redux Demo App' />
            </MediaOverlay>
          </Media>
          <CardText>
              Welcome to the home page!
          </CardText>
          <CardActions>
            <Button raised secondary
              label='Create an anonymous room'
              onClick={this.handleAddRoom}
            >
              chat_bubble_outline
            </Button>
          </CardActions>
        </Card>
      </article>
    )
  }
}
export default Home
