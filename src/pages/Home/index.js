import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Grid, Button, Form, Input } from 'semantic-ui-react'

import { updateUser } from '../../actions/user'

import classNames from 'classnames/bind'
import styles from './index.scss'
const cx = classNames.bind(styles)

class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func
  }

  state = {
    isDisabled: true,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    jobTitle: this.props.user.jobTitle,
    skills: this.props.user.skills,
    degree: this.props.user.degree,
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      firstName: nextProps.user.firstName,
      lastName: nextProps.user.lastName,
      email: nextProps.user.email,
      jobTitle: nextProps.user.jobTitle,
      skills: nextProps.user.skills,
      degree: nextProps.user.degree,
    }
  }

  onClickEditMode = () => {
    this.setState({
      isDisabled: false
    })
  }

  onChangeInput = (e, data) => {
    if (data.name === 'skills') {
      data.value = data.value.trim().split(',')
    }
    console.log(data)
    this.setState({
      [data.name]: data.value
    })
  }

  onClickSave = () => {
    const { firstName, lastName, jobTitle, skills, degree } = this.state
    this.props.updateUser({
      firstName,
      lastName,
      jobTitle,
      skills,
      degree
    })
    this.setState({
      isDisabled: true
    })
  }

  render() {
    const { isDisabled, firstName, lastName, email, jobTitle, skills, degree } = this.state
    const userSkills = skills && skills.join(',')
    return (
      <div className={cx('Home__content')}>
        <Grid verticalAlign="middle" columns='equal'>
          <Grid.Column />
          <Grid.Column width={6}>
            <Form>
              <Form.Group width='equal'>
                <Form.Field>
                  <label className={cx('Home__label')}>First Name</label>
                  <Input
                    name='firstName'
                    value={firstName}
                    className={cx('Home__Input')}
                    disabled={isDisabled}
                    onChange={this.onChangeInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label className={cx('Home__label')}>Last Name</label>
                  <Input
                    name='lastName'
                    value={lastName}
                    className={cx('Home__Input')}
                    disabled={isDisabled}
                    onChange={this.onChangeInput}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label className={cx('Home__label')}>Email</label>
                <Input
                  value={email}
                  className={cx('Home__Input')}
                  disabled
                />
              </Form.Field>
              <Form.Field>
                <label className={cx('Home__label')}>Job Title</label>
                <Input
                  name='jobTitle'
                  value={jobTitle}
                  className={cx('Home__Input')}
                  disabled={isDisabled}
                  onChange={this.onChangeInput}
                />
              </Form.Field>
              <Form.Field>
                <label className={cx('Home__label')}>Skills</label>
                <Input
                  name='skills'
                  value={userSkills}
                  className={cx('Home__Input')}
                  disabled={isDisabled}
                  onChange={this.onChangeInput}
                />
              </Form.Field>
              <Form.Field>
                <label className={cx('Home__label')}>Degree</label>
                <Input
                  name='degree'
                  value={degree}
                  className={cx('Home__Input')}
                  disabled={isDisabled}
                  onChange={this.onChangeInput}
                />
              </Form.Field>
              {isDisabled && (
                <Form.Field>
                  <Button basic color='blue' onClick={this.onClickEditMode}>Edit</Button>
                </Form.Field>
              )}
              {!isDisabled && (
                <Form.Field>
                  <Button basic color='blue' onClick={this.onClickSave}>Save</Button>
                </Form.Field>
              )}
            </Form>
          </Grid.Column>
          <Grid.Column />
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: bindActionCreators(updateUser, dispatch),
  dispatch
})

export default connect(null, mapDispatchToProps)(Home)
