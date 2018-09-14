import React, { Component, Fragment } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <h1>react-create-app-redux-boilerplate-material-ui</h1>
        {this.props.children}
      </Fragment>
    )
  }
}

export default Dashboard
