import axios from 'axios';
const serverUrl = 'https://resumera-api.herokuapp.com';

function login() {
  return axios.get(`${serverUrl}/auth/google`);
}

function update(user) {
  return axios.put('/users', user);
}

function getCurrentUser() {
  return axios.get(`${serverUrl}/api/current_user`)
}

export default {
  login,
  update,
  getCurrentUser
};
