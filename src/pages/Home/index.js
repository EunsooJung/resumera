import store from 'store';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form, Input, Button } from 'antd';

import { updateUser } from '../../actions/user';

import classNames from 'classnames/bind';
import styles from './index.scss';
const cx = classNames.bind(styles);

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object,
    updateUser: PropTypes.func,
  };

  state = {
    isDisabled: true,
    displayName: this.props.auth.displayName,
    email: this.props.auth.email,
    photoURL: this.props.auth.photoURL,
    jobTitle: this.props.auth.jobTitle,
    skills: this.props.auth.skills,
    degree: this.props.auth.degree,
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      displayName: nextProps.user.displayName || nextProps.auth.displayName,
      email: nextProps.user.email || nextProps.auth.email,
      photoURL: nextProps.user.photoURL || nextProps.auth.photoURL,
      jobTitle: nextProps.user.jobTitle || nextProps.auth.jobTitle,
      skills: nextProps.user.skills || nextProps.auth.skills,
      degree: nextProps.user.degree || nextProps.auth.degree,
    };
  }

  onClickEditMode = () => {
    this.setState({
      isDisabled: false,
    });
  };

  onChangeInput = e => {
    const value =
      e.target.name === 'skills'
        ? e.target.value.trim().split(',')
        : e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  };

  onClickSave = () => {
    const {
      displayName,
      email,
      photoURL,
      jobTitle,
      skills,
      degree,
    } = this.state;

    this.props.updateUser(store.get('uid'), {
      displayName,
      email,
      photoURL: photoURL || '',
      jobTitle: jobTitle || '',
      skills: skills || [],
      degree: degree || '',
    });
    this.setState({
      isDisabled: true,
    });
  };

  render() {
    const {
      isDisabled,
      displayName,
      email,
      jobTitle,
      skills,
      degree,
    } = this.state;
    const userSkills = skills && skills.join(',');
    return (
      <div className={cx('Home__content')}>
        <Form layout="vertical">
          <Row>
            <Col span={6} offset={9}>
              <Row>
                <Form.Item label="Name">
                  <Input
                    name="displayName"
                    value={displayName}
                    className={cx('Home__Input')}
                    disabled={isDisabled}
                    onChange={this.onChangeInput}
                  />
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="Email">
                  <Input
                    name="email"
                    value={email}
                    className={cx('Home__Input')}
                    disabled={isDisabled}
                    onChange={this.onChangeInput}
                  />
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="Job Title">
                  <Input
                    name="jobTitle"
                    value={jobTitle}
                    className={cx('Home__Input')}
                    disabled={isDisabled}
                    onChange={this.onChangeInput}
                  />
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="Skills">
                  <Input
                    name="skills"
                    value={userSkills}
                    className={cx('Home__Input')}
                    disabled={isDisabled}
                    onChange={this.onChangeInput}
                  />
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="Degree">
                  <Input
                    name="degree"
                    value={degree}
                    className={cx('Home__Input')}
                    disabled={isDisabled}
                    onChange={this.onChangeInput}
                  />
                </Form.Item>
              </Row>
              <Row>
                <Form.Item>
                  {isDisabled && (
                    <Button onClick={this.onClickEditMode}>Edit</Button>
                  )}
                  {!isDisabled && (
                    <Button onClick={this.onClickSave}>Save</Button>
                  )}
                </Form.Item>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: bindActionCreators(updateUser, dispatch),
  dispatch,
});

export default connect(null, mapDispatchToProps)(Home);
