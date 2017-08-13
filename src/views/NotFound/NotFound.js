import React from 'react'

import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'

class NotFound extends React.Component {
  render () {
    return (
      <article>
        <Card className='md-grid md-cell--8'>
          <CardTitle title='Page not Found' subtitle='Wow!' />
          <CardText>
            <p className='md-body-1'>
              Welcome to the home page!
            </p>
          </CardText>
        </Card>
      </article>
    )
  }
}
export default NotFound
