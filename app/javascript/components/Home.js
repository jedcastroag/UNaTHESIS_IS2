import React from "react"
import PropTypes from "prop-types"
import Redirect from 'react-router-dom'

import Http from '../services/RestServices'

import JuryTutorHome from './JuryTutorHome'
import HomeStudent from './HomeStudent'
import HomeAdmin from './HomeAdmin'
import Login from './LoginForm'

const HOME_PATH = '/home';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user_type_id: null,
			response: null
		};

		Http.get(HOME_PATH).then(response => {
			this.setState({
				user_type_id: response['data']['user_type_id'],
				response: response['data']
			});
		}).catch(error => console.log("Error " + error));
	}

	renderUserHome() {
		switch(this.state.user_type_id) {
			case 'admin':
			return <HomeAdmin data={this.state.response}/>;
			case 'student':
			return <HomeStudent data={ this.state.response }/>;
			case 'jury_tutor':
			return <JuryTutorHome data={this.state.response}/>;
			default:
			return <div style = {{height:"100px"}}>
				<h2>Redirecting...</h2>
			</div>;
		}
	}

	render () {
		return this.renderUserHome();
	}
}

export default Home
