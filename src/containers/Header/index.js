import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { Menu, Dropdown } from 'semantic-ui-react'
import { MdPersonOutline } from 'react-icons/lib/md'

import { signOut } from '../../actions/user'

import classNames from 'classnames/bind'
import styles from './index.scss'
const cx = classNames.bind(styles)

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object,
    signOut: PropTypes.func
  }

  state = {
    activeItem: 'HOME'
  }

  componentDidMount() {
    const { pathname } = this.props.location
    const route = pathname.split('/')[1]
    this.setState({
      activeItem: route.toUpperCase(),
    })
  }

  onClickMenu = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push(name.toLowerCase())
  }

  onClickLogout = () => {
    this.props.signOut(this.props.history)
  }

  render() {
    const { activeItem } = this.state
    const { authenticated } = this.props.auth

    return (
      <div className={cx('Header')}>
        <Menu className={cx('Header__Menu')} secondary>
          <Menu.Item className={cx('Header__title')}>resumera</Menu.Item>
          {authenticated && (
            <Menu.Item
              data-elm-id="menu-dashboard"
              name="HOME"
              onClick={this.onClickMenu}
              className={cx({
                Menu__item: activeItem !== 'HOME',
                'Menu__item-active': activeItem === 'HOME',
              })}
            />
          )}
          {authenticated && (
            <Menu.Item
              data-elm-id="menu-balance"
              name="PROFILES"
              onClick={this.onClickMenu}
              className={cx({
                Menu__item: activeItem !== 'PROFILES',
                'Menu__item-active': activeItem === 'PROFILES',
              })}
            />
          )}
          <Menu.Menu position="right">
            {authenticated && (
              <Menu.Item className={cx('Util__item')}>
                <Dropdown
                  item
                  icon={<MdPersonOutline size={24} />}
                  floating
                  button
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.onClickLogout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: bindActionCreators(signOut, dispatch),
  dispatch
})

export default withRouter(connect(null, mapDispatchToProps)(Header))
