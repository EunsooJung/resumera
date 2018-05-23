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
    user: PropTypes.object,
    updateUser: PropTypes.func,
  };

  state = {
    isDisabled: true,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    jobTitle: this.props.user.jobTitle,
    skills: this.props.user.skills,
    degree: this.props.user.degree,
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      firstName: nextProps.user.firstName,
      lastName: nextProps.user.lastName,
      email: nextProps.user.email,
      jobTitle: nextProps.user.jobTitle,
      skills: nextProps.user.skills,
      degree: nextProps.user.degree,
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
    const { firstName, lastName, jobTitle, skills, degree } = this.state;
    this.props.updateUser({
      firstName,
      lastName,
      jobTitle,
      skills,
      degree,
    });
    this.setState({
      isDisabled: true,
    });
  };

  render() {
    const {
      isDisabled,
      firstName,
      lastName,
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
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <Input
                      name="firstName"
                      value={firstName}
                      className={cx('Home__Input')}
                      disabled={isDisabled}
                      onChange={this.onChangeInput}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <Input
                      name="lastName"
                      value={lastName}
                      className={cx('Home__Input')}
                      disabled={isDisabled}
                      onChange={this.onChangeInput}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Form.Item label="Email">
                  <Input
                    name="email"
                    value={email}
                    className={cx('Home__Input')}
                    disabled
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
                    name="Degree"
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
