import axios from 'axios'

function get() {
  return axios.get('profiles')
}

export default {
  get
}
