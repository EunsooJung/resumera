import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { signIn, getCurrentUser } from '../../actions/user';
import GoogleButton from 'react-google-button';

import { Row, Col } from 'antd';

import classNames from 'classnames/bind';
import styles from './index.scss';
const cx = classNames.bind(styles);

class Landing extends Component {
  static propTypes = {
    signIn: PropTypes.func,
  };

  onClickGoogleButton = () => {
    this.props.signIn(this.props.history);
  };

  render() {
    return (
      <div className={cx('Landing__content')}>
        <Row>
          <Col span={4} offset={10}>
            <GoogleButton onClick={this.onClickGoogleButton} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: bindActionCreators(signIn, dispatch),
  getCurrentUser: bindActionCreators(getCurrentUser, dispatch),
  dispatch,
});

export default withRouter(connect(null, mapDispatchToProps)(Landing));
