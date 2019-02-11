import axios from 'axios';
import auth from './auth'

const headers = { headers: { Authorization: "Bearer " + auth.getToken() } }

export default {
	get() {
		return axios.get(url, {headers:headers});
	},
	post(url) {
		return axios.post(url, {
			headers: headers
		});
	}
}