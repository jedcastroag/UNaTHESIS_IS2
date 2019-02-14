import React from "react"
import PropTypes from "prop-types"
import Redirect from 'react-router-dom'

import Http from '../services/restservices'

import HomeJury from './HomeJury'
import HomeStudent from './HomeStudent'
import HomeTutor from './HomeTutor'
import HomeAdmin from './HomeAdmin'

const DATA_URL = '/home';

class Home extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			user_type_id: null,
			response: null
		};

		Http.get('/home').then(response => {
			this.setState({
				user_type_id: response['data']['user_type_id'],
				response: response['data']['data']
			});
			// console.log(response);
		});
	}

	renderUserHome() {
		switch(this.state.user_type_id) {
			case 1:
			return <HomeAdmin data={this.state.response}/>;
			case 2:
			return <HomeStudent data={this.state.response}/>;
			case 3:
			return <HomeTutor data={this.state.response}/>;
			case 4:
			return <HomeJury data={this.state.response}/>;
			default:
			return <HomeStudent data={this.setState.response} />;
		}
	}

	render () {
		return this.renderUserHome();
	}
}

export default Home
