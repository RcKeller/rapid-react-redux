import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'

@connect(
  state => ({ path: state.routing.locationBeforeTransitions })
)
class NotFound extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }
  render (
    { location, router } = this.props
  ) {
    return (
      <article>
        <Card className='md-grid md-cell--8'>
          <CardTitle title='Page not Found' subtitle={location.pathname} />
          <CardActions className='md-divider-border md-divider-border--top'>
            <Button raised secondary label='Return Home'
              onClick={() => router.push('/')}
            >
              chat_bubble_outline
            </Button>
          </CardActions>
        </Card>
      </article>
    )
  }
}
export default NotFound
