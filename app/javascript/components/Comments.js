import React from "react"
import PropTypes from "prop-types"

import { Grid, Image, Label, Segment, Header } from 'semantic-ui-react'

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

	render() {
		return (
			<Segment raised>
			<Label as='a' color={ this.selectColor(this.props.role) } ribbon>
			{ this.props.role }</Label>
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

/*
*/

render () {
	console.log(this.props.comments);
	return (
		<React.Fragment>
		<Header dividing as='h4'>Comentarios</Header>
		{
			this.props.comments.map(function(comment, index) {
				return <Comment key={ "comment_" + index } 
				content={ comment.content } title={ comment.title } 
				role={ comment.role } />;
			})
		}
		</React.Fragment>
		);
}
}

Comments.defaultProps = {
	comments: []
};

export default Comments
