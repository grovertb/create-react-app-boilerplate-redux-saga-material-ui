import React, { Component } from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import DevTools from './DevTools'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const muiTheme = createMuiTheme()

export default class Root extends Component {
  render() {
    const { store, children } = this.props

    return (
      <Provider store={store}>
        <div>
          <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
