import store from 'store';
import userAPI from '../dataProviders/user';
import ACTIONS from '../constants/actions';

export function signIn(userData, route) {
  return async dispatch => {
    // const user = await userAPI.login()
    dispatch({
      type: ACTIONS.AUTH_USER,
      value: userData,
    });
    route.push('/home');
  };
}

export function signOut(route) {
  return dispatch => {
    store.remove('token');
    dispatch({
      type: ACTIONS.UNAUTH_USER,
    });
    route.push('/');
  };
}

export function getCurrentUser() {
  return aync dispatch => {
    const user = await userAPI.getCurrentUser()
    console.log(user)
    dispatch({
      type: ACTIONS.GET_USER,
      value: user,
    });
  };
}

export function updateUser(user) {
  return async dispatch => {
    try {
      // await userAPI.update(user)
      dispatch({
        type: ACTIONS.UPDATE_USER,
        value: user,
      });
    } catch (err) {
      console.error(err);
    }
  };
}
