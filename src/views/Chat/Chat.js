import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { UserIsAuthenticated, authenticated } from '../../services/auth'

import Card from 'react-md/lib/Cards/Card'
import CardText from 'react-md/lib/Cards/CardText'

//  Require auth. Connect to a room based on URL params.
@compose(
  UserIsAuthenticated,
  firebaseConnect(props => [`rooms/${props.params.room}`]),
  connect((state, props) => ({
    user: state.firebase.auth,
    id: props.params.room,
    room: state.firebase.data.rooms
      && state.firebase.data.rooms[props.params.room]
  }))
)
class Chat extends React.Component {
  static propTypes = {
    room: PropTypes.shape({
      createdAt: PropTypes.string,
      createdBy: PropTypes.string,
      owner: PropTypes.string,
      messages: PropTypes.array
    }),
    user: PropTypes.shape({
      displayName: PropTypes.string,
      photoURL: PropTypes.string,
      uid: PropTypes.string
    })
  }
  render ({ id, room } = this.props) {
    return (
      <article id={id}>
        <Card className='md-grid md-cell--8'>
          <CardText>
              Chat page:
          </CardText>
        </Card>
      </article>
    )
  }
}
export default Chat
