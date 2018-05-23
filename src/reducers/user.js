import ACTIONS from '../constants/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_USER:
      return Object.assign({}, state, action.value);
    case ACTIONS.UPDATE_USER:
      return Object.assign({}, state, action.value);
    default:
      return state;
  }
};
