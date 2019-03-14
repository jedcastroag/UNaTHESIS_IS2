import React from "react"
import PropTypes from "prop-types"

import Http from '../services/RestServices'

import HomeStudent from './student/HomeStudent'
import HomeAdmin from './HomeAdmin'
import JuryTutorHome from './JuryTutorHome'

import { Loader, Dimmer } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

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

			if(response.data.activated == false)
				this.props.history.push("/change_password");
		}).catch(error => console.log("Error " + error));
	}
	
	renderUserHome() {
		switch (this.state.user_type_id) {
			case 'admin':
			return <HomeAdmin data={this.state.response} />;
			case 'student':
			return <HomeStudent data={this.state.response} />;
			case 'jury_tutor':
			return <JuryTutorHome data={this.state.response} />;
			default:
			return <Dimmer active>
			<Loader size='medium' active inline className="low green">Cargando</Loader>
			</Dimmer>;
		}
	}
	
	render() {
		return <div>
		{ this.renderUserHome() }
		</div>
	}	
}

export default withRouter(Home)
