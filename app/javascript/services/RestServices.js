import axios from 'axios';
import auth from './Auth';

export default {
	process_error(error) {
		if(error.response.status == 401) {
			auth.notifyTokenInvalid();
			console.log("Token verification failed");
		}
	},

	get(url, params = {}, withCredentials = true) {
		var response = new Promise((resolve, reject) => {
			var headers = {}
			
			if(withCredentials)
				headers = { Authorization: "Bearer " + auth.getToken() };
			
			axios.get(url, { headers: headers, ...params })
			.then(response => resolve(response))
			.catch(error => {
				this.process_error(error);
				reject(error);
			});
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
			.catch(error => {
				this.process_error(error);
				reject(error);
			});
		});
		return response;
	}
}