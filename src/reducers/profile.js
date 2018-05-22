import ACTIONS from '../constants/actions'

export default (state = [], action) => {
  switch (action.type) {
    case ACTIONS.GET_PROFILES:
      console.log(action.value)
      return action.value
    default:
      return state
  }
}
