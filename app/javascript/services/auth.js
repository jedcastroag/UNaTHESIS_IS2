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
		return axios.post('/login', {
			data: {
				email: email,
				password: password
			},
			timeout: 1000
		}).then((response) => {
			jwt = response.data.token;
			window.localStorage.setItem("token", jwt);
		}).catch(err => {
			console.log("Error " + err.message);
		});
	},

	logout() {
		jwt = null;
		window.localStorage.removeItem("token");
	}
}