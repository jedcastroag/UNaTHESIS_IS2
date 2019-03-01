import Http from '../services/RestServices';
import { Subject } from 'rxjs';

let jwt = window.localStorage.getItem("token");
let jwtObservable = new Subject();

export default {
	getObservable() {
		return jwtObservable;
	},

	notifyTokenInvalid() {
		this.logout();
	},

	isAuthenticated() {
		return jwt !== null;
	},
	
	getToken() {
		return jwt;
	},
	
	login(email, password) {
		let promise = new Promise((resolve, reject) => {
			Http.post('/login', {
				session: {
					email: email,
					password: password
				},
				timeout: 1000
			}, false).then((response) => {
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
		jwtObservable.next(false);
	}
};