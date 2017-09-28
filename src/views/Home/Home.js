import React from 'react'
import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { user } from '../../services/auth'
import { addRoom } from '../../services/rooms'

import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardActions from 'react-md/lib/Cards/CardActions'
import CardText from 'react-md/lib/Cards/CardText'
import Media, { MediaOverlay } from 'react-md/lib/Media'
import Button from 'react-md/lib/Buttons'

@compose(
  firebaseConnect(),
  connect(
    // state => ({ user: authenticated(state) && state.firebase.auth }),
    state => ({ user: user(state) }),
    dispatch => ({ handleAddRoom: bindActionCreators(addRoom, dispatch) })
  )
)
class Home extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      uid: PropTypes.string
    }),
    handleAddRoom: PropTypes.func.isRequired
  }
  render (
    { user, handleAddRoom } = this.props
  ) {
    return (
      <article>
        <Card className='md-grid md-cell--8'>
          <Media>
            <img src='/img/banner.png' alt='' />
            <MediaOverlay>
              <CardTitle title='Welcome to Crypto Chat' subtitle='Rapid-React-Redux Demo App' />
            </MediaOverlay>
          </Media>
          <CardText>
              Welcome to the home page!
          </CardText>
          <CardActions>
            <Button raised secondary disabled={!user}
              label='Create an anonymous room'
              onClick={() => handleAddRoom(user)}
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
