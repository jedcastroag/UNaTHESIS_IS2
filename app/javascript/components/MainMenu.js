import React from "react"
import PropTypes from "prop-types"

import { Menu, Image } from 'semantic-ui-react'

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

	/*{ items[this.props.userType].map(function(element, index) {
				return <Menu.Item key={ index } content={ element }/>;
			}) 
		}*/

	render () {
		return (
			<Menu fixed="top">
			<Menu.Item>
			<Image size="mini" src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Escudo_unal_2016.png" />
			</Menu.Item>

			<Menu.Item as="a" content="UnThesis" key="home" />

			<Menu.Menu position="right">

			<Menu.Item content={ this.userType }/>

			<Menu.Item as="a" content="Salir" key="logout" onClick={ this.props.logout } />

			</Menu.Menu>
			</Menu>
			);
	}
}

export default MainMenu
