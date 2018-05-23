import store from 'store';
import { v1 } from 'uuid';
import firebase from 'firebase';
import ACTIONS from '../constants/actions';
import userAPI from '../dataProviders/user';

export function signIn(route) {
  return async dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider();
    // const user = await userAPI.login()
    const resp = await firebase.auth().signInWithPopup(provider);
    const { user, credential } = resp;
    store.set('uid', user.uid);
    store.set('token', credential.accessToken);
    const { displayName, email, photoURL } = user;
    const userData = { displayName, email, photoURL };
    dispatch({
      type: ACTIONS.AUTH_USER,
      value: userData,
    });
    route.push('/home');
  };
}

export function signOut(route) {
  return async dispatch => {
    await firebase.auth().signOut();
    dispatch({
      type: ACTIONS.UNAUTH_USER,
    });
    store.clearAll();
    route.push('/');
  };
}

export function getCurrentUser() {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch({ type: ACTIONS.GET_USER, value: userData });
      } else {
        dispatch({ type: ACTIONS.UNAUTH_USER });
      }
    });
  };
}

export function updateUser(id, user) {
  return dispatch => {
    const db = firebase.database();
    const dbRef = db
      .ref()
      .child('profiles')
      .child(v1());

    dbRef.set({
      displayName: user.displayName,
      email: user.email,
      jobTitle: user.jobTitle,
      photoURL: user.photoURL,
      skills: user.skills,
      degree: user.degree,
    });

    dispatch({ type: ACTIONS.UPDATE_USER, value: user });
  };
}
