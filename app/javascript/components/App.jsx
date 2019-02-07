import React from "react"
import PropTypes from "prop-types"

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import auth from '../services/auth'
import LoginForm from './LoginForm'
import LoadProjectForm from './LoadProjectForm'
import ViewProject from './ViewProject'

const routes = [
	{ path: "/", exact: true, component: LoginForm },
	{ path: "/project/load", exact: true, component: LoadProjectForm },
	{ path: "/project/view", exact: true, component: ViewProject}
];

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isAuthenticated: auth.isAuthenticated()
		}
	}

	render () {
		return (
			<BrowserRouter>
			<div>
			<Switch>
				{ routes.map(function(route, index) {
					return <Route exact key={ index } path={ route['path'] } component={ route['component'] } />
				}) }
			</Switch>
			</div>
			</BrowserRouter>
			);
	}
}

export default App
