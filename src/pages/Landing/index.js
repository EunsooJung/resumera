import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { signIn } from '../../actions/user';
import GoogleButton from 'react-google-button';
import GoogleLogin from 'react-google-login';

import { Row, Col } from 'antd';

import classNames from 'classnames/bind';
import styles from './index.scss';
const cx = classNames.bind(styles);

class Landing extends Component {
  static propTypes = {
    signIn: PropTypes.func,
  };

  state = {
    email: null,
    password: null,
  };

  onClickGoogleSignIn = response => {
    const {
      givenName,
      familyName,
      email,
      googleId,
      imageUrl,
    } = response.profileObj;
    const user = {
      firstName: givenName,
      lastName: familyName,
      email,
      googleId,
      imageUrl,
    };

    this.props.signIn(user, this.props.history);
  };

  onGoogleSigninSuccess = resp => {
    console.log(resp);
  };

  render() {
    return (
      <div className={cx('Landing__content')}>
        <Row>
          <Col span={4} offset={10}>
            <a href="https://resumera-api.herokuapp.com/auth/google">
              <GoogleButton />
            </a>
            <GoogleLogin
              className={cx('googleLoginButton')}
              clientId="547403104179-rlg3l7dcqgjbjukun227pqdndk2f5fhc.apps.googleusercontent.com"
              buttonText={<GoogleButton />}
              onSuccess={this.onGoogleSigninSuccess}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: bindActionCreators(signIn, dispatch),
  dispatch,
});

export default withRouter(connect(null, mapDispatchToProps)(Landing));
