import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default function (ComposedComponent) {
  class Authenticate extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    static propTypes = {
      auth: PropTypes.object,
      user: PropTypes.object,
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.auth.authenticated) {
        this.context.router.history.push('/')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
  })

  return connect(mapStateToProps)(Authenticate)
}
