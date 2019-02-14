import axios from 'axios';

let jwt = window.localStorage.getItem("token");

export default {
	isAuthenticated() {
		return jwt !== null;
	},

	getToken() {
		return jwt;
	},

	login(email, password) {
		let promise = new Promise((resolve, reject) => {
			axios.post('/login', {
				session: {
					email: email,
					password: password
				},
				timeout: 1000
			}).then((response) => {
				jwt = response.data.token;
				window.localStorage.setItem("token", jwt);
				resolve(response);
			}).catch(err => {
				console.log("Error " + err.message);
				reject(err);
			})
		});

		return promise;
	},

	logout() {
		jwt = null;
		window.localStorage.removeItem("token");
	}
}