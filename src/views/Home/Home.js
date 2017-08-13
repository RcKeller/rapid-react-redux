import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  pathToJS,
  dataToJS
} from 'react-redux-firebase'
import { UserIsAuthenticated } from '../../services/auth'
const uuidv4 = require('uuid/v4')

import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardActions from 'react-md/lib/Cards/CardActions'
import CardText from 'react-md/lib/Cards/CardText'
import Media, { MediaOverlay } from 'react-md/lib/Media'
import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons'

@compose(
  firebaseConnect(),
  connect(({ firebase }) => ({
    auth: pathToJS(firebase, 'auth')
  }))
)
class Home extends React.Component {
  handleAddRoom = () => {
    const { firebase, auth, router } = this.props
    if (auth) {
      //  FIXME: Redirecting by pre-genned ID's still doesn't work since FB makes the first and only prop of said UUID a hash
      const id = uuidv4()
      let room = { owner: auth.uid, messages: [] }
      firebase.pushWithMeta(`/rooms/${id}`, room)
      .then(() => router.push(`/chat/${id}`))
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
