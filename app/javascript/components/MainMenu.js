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


const AdminMenu = () =>{
	<div>
		<Menu.Item as={Link} content="Usuarios" key="home" to="/admin/users" />
		<Menu.Item as={Link} content="Proyectos" key="home" to="/admin/projects" />
	</div>
}
 

const StudentMenu = () => {
	<div>
		<Menu.Item as={Link} content="Usuarios" key="home" to="/admin/users" />
		<Menu.Item as={Link} content="Proyectos" key="home" to="/admin/projects" />
	</div>
}

const TutorMenu = () => {
	<div>
		<Menu.Item as={Link} content="Usuarios" key="home" to="/admin/users" />
		<Menu.Item as={Link} content="Proyectos" key="home" to="/admin/projects" />
	</div>
}

const JuryMenu = () => {
	<div>
		<Menu.Item as={Link} content="Usuarios" key="home" to="/admin/users" />
		<Menu.Item as={Link} content="Proyectos" key="home" to="/admin/projects" />
	</div>
}
class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.userType = this.props.userType;
		this.state = {
			menu: []
		}	
		switch (this.userType) {
			case 'admin':
				this.setState(prevState => ({
					menu: [<AdminMenu />]
				}))
			case 'student':
				this.menu = <StudentMenu />;
			case 'jury_tutor':
				this.menu = <JuryMenu />;
			case 'jury_tutor':
				this.menu = <TutorMenu />;
		}
		
	}

	render () {
		return (
			<Menu fixed="top">
			<Menu.Item>
			<Image size="mini" src={ logo } />
			</Menu.Item>

			<Menu.Item as={ Label } size="large">UnThesis</Menu.Item>

			<Menu.Item as={ Link } content="Home" key="home" to="/"/>
			{this.state.menu}
			<Menu.Menu position="right">

			
			<Menu.Item as="a" content="Salir" key="logout" onClick={ this.props.logout } />

			</Menu.Menu>
			</Menu>
			);
	}
}

export default MainMenu
