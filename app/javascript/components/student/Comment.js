import React from "react"
import PropTypes from "prop-types"

import { Segment, Label } from 'semantic-ui-react'

const colors = [
	'red',
	'green',
	'blue',
	'purple'
];

class Comment extends React.Component {
	constructor(props) {
		super(props);
	}
	
	selectColor = (role) => {
		if(role <= 3)
		return colors[role];
		return colors[colors.length - 1]
	}
	
	getRoleName(role) {
		switch(role){
			case 1:
			return "Autor";
			case 2:
			return "Tutor";
			case 3:
			return "Jurado";
			default:
			return "Rol desconocido";
		}
	}
	
	render() {
		return (
			<Segment raised>
			<Label as='a' color={ this.selectColor(this.props.role) } ribbon>
			{ this.props.author }</Label>
			<span> { this.props.title } </span>
			<p>{ this.props.content }</p>
			</Segment>
			); 
		}
	}
	
	Comment.defaultProps = {
		title: "",
		role: "Rol desconocido",
		author: "Autor desconocido"
    }
    
    export default Comment