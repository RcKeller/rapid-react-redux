import React from 'react'

import Card from 'react-md/lib/Cards/Card'
import CardText from 'react-md/lib/Cards/CardText'

class Home extends React.Component {
  render () {
    return (
      <article>
        <Card className='md-grid md-cell--8'>
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
export default Home
