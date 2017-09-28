import React from 'react'
import PropTypes from 'prop-types'

import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'

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
