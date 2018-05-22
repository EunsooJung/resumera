import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { Grid } from 'semantic-ui-react'
import { signIn } from '../../actions/user'
import GoogleButton from 'react-google-button'
import GoogleLogin from 'react-google-login'

import classNames from 'classnames/bind'
import styles from './index.scss'
const cx = classNames.bind(styles)

class Landing extends Component {
  static propTypes = {
    signIn: PropTypes.func
  }

  state = {
    email: null,
    password: null
  }

  onClickGoogleButton = () => {
    this.props.signIn()
  }

  onClickGoogleSignIn = response => {
    console.log(response)
  }

  render() {
    return (
      <div className={cx('Landing__content')}>
        <Grid verticalAlign="middle" columns='equal'>
          <Grid.Column />
          <Grid.Column width={4}>
            <GoogleLogin
              className={cx('googleLoginButton')}
              clientId="547403104179-rai5kch2q1faupika73ddpsict5f1u8b.apps.googleusercontent.com"
              buttonText={<GoogleButton type='light' />}
              onSuccess={this.onClickGoogleSignIn}
            />
          </Grid.Column>
          <Grid.Column />
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: bindActionCreators(signIn, dispatch),
  dispatch
})

export default withRouter(connect(null, mapDispatchToProps)(Landing))
