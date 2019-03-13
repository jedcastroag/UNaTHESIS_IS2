import React from "react"
import PropTypes from "prop-types"

import { Label, Segment, Header, Container, Icon } from 'semantic-ui-react'

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
			{ this.getRoleName(this.props.role) }</Label>
			<span> { this.props.title } </span>
			<p>{ this.props.content }</p>
			</Segment>
			);
		}
	}
	
	Comment.defaultProps = {
		title: "[Comment without title]",
		role: "Unknown role"
	}
	
	class Comments extends React.Component {
		constructor(props) {
			super(props);
		}
		
		renderComments() {
			if(this.props.comments.length > 0) 
			return <div>
			{
				this.props.comments.map(function(comment, index) {
					return <Comment key={ "comment_" + index } 
					content={ comment.content } title={ comment.title } 
					role={ comment.role } />;
				})
			}
			</div>;
			return <Container>
			<Segment textAlign="center">
			<Header icon>
			<Icon name='comments' />
			No hay comentarios aún acerca de tu tesis
			</Header>
			</Segment>
			</Container>;
		}
		
		render () {
			return (
				<React.Fragment>
				<Header dividing as='h4'>Comentarios</Header>
				{ this.renderComments() }
				</React.Fragment>
				);
			}
		}
		
		Comments.defaultProps = {
			comments: []
		};
		
		export default Comments
		