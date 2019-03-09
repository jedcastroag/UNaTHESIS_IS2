import React from "react"
import PropTypes from "prop-types"

import { Link } from "react-router-dom";

import { Menu, Image, Label } from 'semantic-ui-react';
import logo from '../../assets/images/escudounal.png';
import Auth from '../services/Auth';

const items = [
{}, //Administrator
['Mi perfil'], //Student
{},
{}
]
 
class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.userType = this.props.userType;
	}

	render () {
		return (
			<Menu fixed="top">
			<Menu.Item>
			<Image size="mini" src={ logo } />
			</Menu.Item>

			<Menu.Item as={ Label } size="large">UnThesis</Menu.Item>

			<Menu.Item as={ Link } content="Home" key="home" to="/"/>

			<Menu.Menu position="right">

			
			<Menu.Item as="a" content="Salir" key="logout" onClick={ this.props.logout } />

			</Menu.Menu>
			</Menu>
			);
	}
}

export default MainMenu
