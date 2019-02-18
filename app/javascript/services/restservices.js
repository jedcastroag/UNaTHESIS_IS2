import axios from 'axios';
import auth from './auth'

export default {
	get(url, params = {}, withCredentials = true) {

		if(withCredentials)
			return axios.get(url, { 
				headers: { Authorization: "Bearer " + auth.getToken() },
				...params });
		return axios.get(url, params);
	},

	post(url, body, withCredentials = true) {
		if(withCredentials)
			return axios.post(url, body, { 
				headers: { Authorization: "Bearer " + auth.getToken() } });
		return axios.post(url, body);
	}
}