import React from 'react'
import { connect } from 'react-redux'

import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'

@connect(state => ({ path: state.routing.locationBeforeTransitions }))
class NotFound extends React.Component {
  render ({ location } = this.props) {
    return (
      <article>
        <Card className='md-grid md-cell--8'>
          <CardTitle title='Page not Found' subtitle={location && location.pathname} />
          <CardActions className='md-divider-border md-divider-border--top'>
            <Button flat label='Return Home' secondary />
          </CardActions>
        </Card>
      </article>
    )
  }
}
export default NotFound
