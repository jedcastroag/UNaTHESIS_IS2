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

class AdminMenu extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		return <Menu.Menu key="submenu">
			<Menu.Item as={Link} content="Usuarios" key='users' to="/admin/users" />
			<Menu.Item as={Link} content="Proyectos" key='projects' to="/admin/projects" />
		</Menu.Menu>
	}
}
 

const StudentMenu = () => {
	<div>
		
	</div>
}

const TutorMenu = () => {
	<div>
		
	</div>
}

const JuryMenu = () => {
	<div>
		
	</div>
}
class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.userType = this.props.userType;
		this.state = {
			menu: []
		}
		
		
	}
	componentDidMount(){

		switch (this.userType) {
			case 'admin':
				console.log('adminMenu')
				this.setState(prevState => ({
					menu: [...prevState.menu, <AdminMenu key="admin" key_1 = 'users' key_2='projects'/>]
				}))
				break
			case 'student':
				
				break
			case 'jury_tutor':
				
				break
			case 'jury_tutor':
				
				break
		}
	}


	render () {
		return (
			<Menu fixed="top" key="menu">
			<Menu.Item key="logo1">
			<Image size="mini" src={ logo } key="logo_img"/>
			</Menu.Item>

			<Menu.Item as={ Label } key='logo2' size="large">UnThesis</Menu.Item>

			<Menu.Item as={ Link } content="Home" key="home" to="/"/>
			{this.state.menu}
			<Menu.Menu key="submenu3" position="right">

			
			<Menu.Item as="a" content="Salir" key="logout" onClick={ this.props.logout } />

			</Menu.Menu>
			</Menu>
			);
	}
}

export default MainMenu
