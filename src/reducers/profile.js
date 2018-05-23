import ACTIONS from '../constants/actions';

export default (state = [], action) => {
  switch (action.type) {
    case ACTIONS.GET_PROFILES:
      return action.value;
    default:
      return state;
  }
};
