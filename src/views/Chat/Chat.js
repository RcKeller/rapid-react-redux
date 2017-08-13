import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  pathToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

import Card from 'react-md/lib/Cards/Card'
import CardText from 'react-md/lib/Cards/CardText'
import { UserIsAuthenticated } from '../../services/auth'

@UserIsAuthenticated
// @firebaseConnect()
// // @connect((state, props) => ({ TEST: state.firebase }))
// @connect(({ firebase }) => ({
//     todos: dataToJS(firebase, 'rooms')
//   })
// )
@connect((state, props) => ({ id: props.params.room }))
class Chat extends React.Component {
  render () {
    return (
      <article>
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
