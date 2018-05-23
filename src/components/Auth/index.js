import store from 'store';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentUser } from '../../actions/user';

export default function(ComposedComponent) {
  class Authenticate extends Component {
    static contextTypes = {
      router: PropTypes.object,
    };

    static propTypes = {
      auth: PropTypes.object,
      user: PropTypes.object,
      getCurrentUser: PropTypes.func,
    };

    componentDidMount() {
      this.props.getCurrentUser(store.get('uid'));
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.auth.authenticated) {
        this.context.router.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
  });

  const mapDispatchToProps = dispatch => ({
    getCurrentUser: bindActionCreators(getCurrentUser, dispatch),
    dispatch,
  });

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
