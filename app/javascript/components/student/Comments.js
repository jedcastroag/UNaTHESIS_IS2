import React from "react"
import PropTypes from "prop-types"

import { Segment, Header, Container, Icon } from 'semantic-ui-react';
import Comment from './Comment';

import { Link } from 'react-router-dom'

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
				role={ comment.role } author={ comment.name + " " + comment.surname }/>;
			})
		}
		</div>;
		return <Container>
		<Segment textAlign="center">
		<Header icon>
		<Icon name='comments' />
		No hay { this.props.title.toLowerCase() } aún acerca de tu tesis
		</Header>
		</Segment>
		</Container>;
	}
	
	render () {
		console.log(this.props.comments);
		return (
			<React.Fragment>
			<Header dividing as='h4'>{this.props.title}</Header>
			{ this.renderComments() }
			</React.Fragment>
			);
		}
	}
	
	Comments.defaultProps = {
		comments: []
	};
	
	export default Comments
	