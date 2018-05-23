import axios from 'axios';
function login() {
  return axios.get(`/auth/google`);
}

function update(user) {
  return axios.put('/users', user);
}

function getCurrentUser() {
  return axios.get('/api/current_user');
}

export default {
  login,
  update,
  getCurrentUser,
};
