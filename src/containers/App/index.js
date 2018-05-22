import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { getCurrentUser } from '../../actions/user'

import Header from '../Header'

import classNames from 'classnames/bind'
import styles from './index.scss'
const cx = classNames.bind(styles)

export class App extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object,
    children: PropTypes.node
  }

  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const { auth, user, children } = this.props
    return (
      <div className={cx('App')}>
        <Header auth={auth} user={user} />
        <div className={cx('App__content')}>{children}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getCurrentUser: bindActionCreators(getCurrentUser, dispatch),
  dispatch
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
