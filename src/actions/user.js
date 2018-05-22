import store from 'store'
import userAPI from '../dataProviders/user'
import ACTIONS from '../constants/actions'

export function signIn(userData, route) {
  return async dispatch => {
    const user = await userAPI.login()
    dispatch({
      type: ACTIONS.AUTH_USER,
      value: user
    })
    route.push('/home')
  }
}

export function signOut(route) {
  return dispatch => {
    store.remove('token')
    dispatch({
      type: ACTIONS.UNAUTH_USER,
    })
    route.push('/')
  }
}

export function getCurrentUser() {
  return dispatch => {
    const user = {
      id: 1234,
      email: 'eunsoojung@email.com',
      firstName: 'Eun Soo',
      lastName: 'Jung',
      jobTitle: 'Software Engineer',
      skills: ['JAVA', 'Spring'],
      degree: 'Master of Science'
    }
    dispatch({
      type: ACTIONS.GET_USER,
      value: user,
    })
  }
}

export function updateUser(user) {
  return async dispatch => {
    try {
      // await userAPI.update(user)
      dispatch({
        type: ACTIONS.UPDATE_USER,
        value: user
      })
    } catch (err) {
      console.error(err)
    }
  }
}
