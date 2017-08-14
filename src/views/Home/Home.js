import React from 'react'
import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { authenticated } from '../../services/auth'
import { addToast } from '../../services/toast'

import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardActions from 'react-md/lib/Cards/CardActions'
import CardText from 'react-md/lib/Cards/CardText'
import Media, { MediaOverlay } from 'react-md/lib/Media'
import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons'

@compose(
  firebaseConnect(),
  connect(
    state => ({
      auth: authenticated(state),
      user: state.firebase.auth
    }),
    dispatch => ({ toast: bindActionCreators(addToast, dispatch) })
  )
)
class Home extends React.Component {
  static propTypes = {
    auth: PropTypes.bool.isRequired,
    user: PropTypes.object
  }
  handleAddRoom = () => {
    const { firebase, toast, user, router } = this.props
    //  Skip user check - button is disabled without auth.
    const room = { owner: user.uid, messages: [] }
    firebase.pushWithMeta('/rooms', room)
    .then(() => {
      toast('Successfully created room')
      //  FIXME: The API has an onComplete param, but doesn't have a standard promise interface?
      // router.push(id)
    })
    .catch((err) => {
      toast('An unknown error occured - unable to create room')
      console.warn(err)
    })
}
  render (
    { auth, user } = this.props
  ) {
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
            <Button raised secondary disabled={!auth}
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
