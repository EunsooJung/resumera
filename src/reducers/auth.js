import ACTIONS from '../constants/actions'

export default (state = { authenticated: false }, action) => {
  switch (action.type) {
    case ACTIONS.AUTH_USER:
      return Object.assign({}, state, { ...action.value, authenticated: true })
    case ACTIONS.UNAUTH_USER:
      return Object.assign({}, state, { authenticated: false })
    default:
      return state
  }
}
