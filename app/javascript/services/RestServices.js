import axios from 'axios';
import auth from './Auth';
import { resolve, reject } from 'when';

export default {
	validate_response(response) {
		
	},
	get(url, params = {}, withCredentials = true) {
		var response = new Promise((resolve, reject) => {
			var headers = {}
			
			if(withCredentials)
				headers = { Authorization: "Bearer " + auth.getToken() };
			
			axios.get(url, { headers: headers, ...params })
			.then(response => resolve(response))
			.catch(error => reject(error));
		});
		
		return response;
	},
	
	post(url, body, withCredentials = true) {
		var response = new Promise((resolve, reject) => {
			var headers = {}
			
			if(withCredentials)
				headers = { Authorization: "Bearer " + auth.getToken() };
			
			axios.post(url, body, { headers: headers })
			.then(response => resolve(response))
			.catch(error => reject(error));
		});
		return response;
	}
}