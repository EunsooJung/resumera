import firebase from 'firebase';
import ACTIONS from '../constants/actions';
import { profiles } from './mockProfiles';

export function getProfiles() {
  return async dispatch => {
    const db = firebase.database();
    const dbRef = db.ref().child('profiles');

    dbRef.on('value', snap => {
      dispatch({
        type: ACTIONS.GET_PROFILES,
        value: snap.val(),
      });
    });
  };
}
