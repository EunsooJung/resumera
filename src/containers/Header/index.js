import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Menu, Icon, Tooltip } from 'antd';

import { signOut } from '../../actions/user';

import classNames from 'classnames/bind';
import styles from './index.scss';
const cx = classNames.bind(styles);

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object,
    signOut: PropTypes.func,
  };

  state = {
    activeItem: 'HOME',
  };

  componentDidMount() {
    const { pathname } = this.props.location;
    const route = pathname.split('/')[1];
    this.setState({
      activeItem: route.toUpperCase(),
    });
  }

  onClickMenu = e => {
    if (e.key !== 'title') {
      if (e.key === 'SIGNOUT') {
        this.props.signOut(this.props.history);
      } else {
        this.setState({ activeItem: e.key });
        this.props.history.push(e.key.toLowerCase());
      }
    }
  };

  onClickLogout = () => {
    this.props.signOut(this.props.history);
  };

  render() {
    const { activeItem } = this.state;
    const { authenticated } = this.props.auth;

    return (
      <div className={cx('Header')}>
        <Menu
          className={cx('Header__Menu')}
          onClick={this.onClickMenu}
          selectedKeys={[activeItem]}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item className={cx('Header__title')} key="title">
            resumera
          </Menu.Item>
          {authenticated && (
            <Menu.Item key="HOME">
              <Icon type="home" />Home
            </Menu.Item>
          )}
          {authenticated && (
            <Menu.Item key="PROFILES">
              <Icon type="profile" />Profiles
            </Menu.Item>
          )}
          {authenticated && (
            <Menu.Item key="SIGNOUT" className={cx('Menu__util')}>
              <Tooltip placement="bottom" title="Log out">
                <Icon type="logout" />
              </Tooltip>
            </Menu.Item>
          )}
        </Menu>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: bindActionCreators(signOut, dispatch),
  dispatch,
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
