import profileAPI from '../dataProviders/profile';
import ACTIONS from '../constants/actions';
import { profiles } from './mockProfiles';

export function getProfiles() {
  return async dispatch => {
    try {
      // const profiles = await profileAPI.get()
      dispatch({
        type: ACTIONS.GET_PROFILES,
        value: profiles,
      });
    } catch (err) {
      console.error(err);
    }
  };
}
