import React, { Component, Fragment } from 'react'

import Typography from '@material-ui/core/Typography'

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Typography gutterBottom variant='display3'>
          create-react-app-boilerplate-redux-saga-material-ui
        </Typography>
        {this.props.children}
      </Fragment>
    )
  }
}

export default Dashboard
