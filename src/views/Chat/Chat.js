import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
// import { UserIsAuthenticated } from '../../services/auth'

import Card from 'react-md/lib/Cards/Card'
import CardText from 'react-md/lib/Cards/CardText'

//  Require auth. Connect to a room based on URL params.
@compose(
  // UserIsAuthenticated,
  firebaseConnect(props => [`rooms/${props.params.room}`]),
  connect((state, props) => ({
    id: props.params.room,
    room: state.firebase.data.rooms
      && state.firebase.data.rooms[props.params.room]
  }))
)
class Chat extends React.Component {
  render ({ id, room } = this.props) {
    console.warn(room)
    return (
      <article id={id}>
        <Card className='md-grid md-cell--8'>
          <CardText>
            <p className='md-body-1'>
              Chat page:
            </p>
          </CardText>
        </Card>
      </article>
    )
  }
}
export default Chat
