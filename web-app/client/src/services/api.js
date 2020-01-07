import axios from 'axios'

export default() => {
  return axios.create({
	  baseURL: 'http://54.169.77.13:8081/'
  })
}
