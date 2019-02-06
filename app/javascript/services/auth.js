import axios from 'axios';

let jwt = window.localStorage.getItem("token");

export default {
	isAuthenticated() {
		return jwt != null;
	},

	getToken() {
		return jwt;
	},

	login(email, password) {
		return axios.post('/login', {
			email: email,
			password: password
		}).then((response) => {
			jwt = response.data.token;
			window.localStorage.setItem("token", jwt);
		});
	},

	logout() {
		jwt = null;
		window.localStorage.removeItem("token");
	}
}