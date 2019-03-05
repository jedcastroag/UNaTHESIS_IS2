import React from "react"
import PropTypes from "prop-types"

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import auth from '../services/Auth'
import LoginForm from './LoginForm'
import MainMenu from './MainMenu'
import LoadProjectForm from './LoadProjectForm'
import ViewProject from './ViewProject'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import UploadThesisConcept from './UploadThesisConcept'
import ModalTokenExpired from './ModalTokenExpired';

/** 
* All the application's paths must be declarated this.
* 
* @type {Array}
* @property {string} path Route to be driven.
* @property {boolean} restricted True or not define for indicate that the path will 
*                                be restricted (only authenticated users can access), False.
* @property {Map} componentParams Parameters of the component
*
* More properties (https://reacttraining.com/react-router/web/api/Route)
*/
const routes = [
	{ path: "/", exact: null, component: Home },
	{ path: "/project/load", exact: null, component: LoadProjectForm },
	{ path: "/project/view", exact: null, component: ViewProject },
	{ path: "/404.html", exact:null, restricted: false },
	{ path: "/load/:id", exact:null, component: UploadThesisConcept}
];

class App extends React.Component {
	constructor() {
		super();
		this.routes = routes;
		this.routes.push({ 
			path: "/login", 
			exact: null, 
			componentProps: {
				updateAuth: this.updateAuth.bind(this)
			},
			component: LoginForm,
			restricted: false
		});
		
		this.state = { 
			isAuthenticated: auth.isAuthenticated(),
			openModal: false
		};
		
		this.logout = this.logout.bind(this);
		
		let observable = auth.getObservable();
		observable.subscribe({
			next: (authenticated) => {
				if(authenticated == false) {
					this.setState({
						openModal: true,
						isAuthenticated: false
					});
				}
			}
		});
	}
	
	updateAuth() {
		this.setState({
			isAuthenticated: auth.isAuthenticated()
		});
	}
	
	logout(e) {
		e.preventDefault();
		auth.logout();
		this.updateAuth();
	}
	
	renderHeader() {
		if(this.state.isAuthenticated)
		return <div>
		<div style={{ height: 80 }} />
		<MainMenu userType={ this.state.userType } 
		logout={ this.logout } updateAuth={ this.updateAuth } />
		</div>;
		return null;
	}
	
	render () {
		return (			
			<BrowserRouter>
			<div>

			<ModalTokenExpired open={ this.state.openModal }/>
			
			{ this.renderHeader() }
			
			<Switch>
			{
				this.routes.map(function(route, index) {
					return <ProtectedRoute { ...route } key={ index } />;
				}, this)
			}
			<Route exact render={() => { window.location.href="404.html" }} />
			</Switch>
			
			</div>
			</BrowserRouter>			
			);	
		}
	}
	
	export default App