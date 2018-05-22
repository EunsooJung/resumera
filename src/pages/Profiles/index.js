import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { getProfiles } from '../../actions/profile'

import { Grid } from 'semantic-ui-react'
import { Table } from 'antd'

import 'antd/es/table/style/index.css';
import 'antd/es/pagination/style/index.css';
import 'antd/es/style/index.css';

import classNames from 'classnames/bind'
import styles from './index.scss'
const cx = classNames.bind(styles)

class Profiles extends Component {
  static propTypes = {
    profiles: PropTypes.array,
    getProfiles: PropTypes.func
  }

  state = {
    profiles: []
  }

  componentDidMount() {
    this.props.getProfiles()
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      profiles: nextProps.profiles
    }
  }

  getColumns = () => {
    return [
      {
        title: 'Name',
        key: 'name',
        render: (text, item) => {
          return <span>{item.firstName} { item.lastName}</span>
        }
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email'
      },
      {
        title: 'Job Title',
        key: 'jobTitle',
        dataIndex: 'jobTitle'
      },
      {
        title: 'Skills',
        key: 'skills',
        render: (text, item) => {
          const skills = (item.skills || []).join(',')
          return <span>{skills}</span>
        }
      },
      {
        title: 'Degree',
        key: 'degree',
        dataIndex: 'degree'
      }
    ]
  }

  render() {
    const { profiles } = this.state
    return (
      <div className={cx('Profiles__content')}>
        <Grid columns='equal'>
          <Grid.Column />
          <Grid.Column width={14}>
            <Table
              rowKey={row => row.email}
              dataSource={profiles}
              columns={this.getColumns()}
              pagination={{
                pageSize: 10,
              }}
            />
          </Grid.Column>
          <Grid.Column />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profiles: state.profiles
})

const mapDispatchToProps = dispatch => ({
  getProfiles: bindActionCreators(getProfiles, dispatch),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
