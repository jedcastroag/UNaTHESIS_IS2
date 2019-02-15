import axios from 'axios';
import auth from './auth'

const headers = { headers: { Authorization: "Bearer " + auth.getToken() } }

export default {
	get(url, withCredentials = true) {
		if(withCredentials)
			return axios.get(url, headers);
		return axios.get(url);
	},
	post(url, withCredentials = true) {
		if(withCredentials)
			return axios.post(url, headers);
		return axios.post(url);
	}
}