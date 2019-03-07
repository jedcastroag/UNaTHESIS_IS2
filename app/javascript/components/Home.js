import React from "react"
import PropTypes from "prop-types"

import Http from '../services/RestServices'

import HomeJury from './HomeJury'
import HomeStudent from './HomeStudent'
import HomeTutor from './HomeTutor'
import HomeAdmin from './HomeAdmin'

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
			return <HomeAdmin data={ this.state.response }/>;
			case 'student':
			return <HomeStudent data={ this.state.response }/>;
			case 'jury_tutor':
			return <HomeTutor data={ this.state.response }/>;
			// case 'jury_tutor':
			// return <HomeJury data={ this.state.response }/>;
			default:
			return null;
		}
	}

	render () {
		return this.renderUserHome();
	}
}

export default Home
