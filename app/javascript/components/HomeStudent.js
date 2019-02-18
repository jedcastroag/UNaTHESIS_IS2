import React from 'react';
import PropTypes from "prop-types";

import { Container, Header, Label, Button, Grid } from 'semantic-ui-react';
import Comments from './Comments';
import PdfViewer from './PdfViewer';

class Details extends React.Component {
	render () {
		return(<h1>Details</h1>);
	}
}

class AdditionalInformation extends React.Component {
	render () {
		return(<h1>Additional info</h1>);
	}
}

class HomeStudent extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<Container text>
			<Header dividing as="h2">{ this.props.data.thesis.title } 
			<Label color="teal">En revisión</Label> </Header>
			<Header dividing as="h2">{ this.props.data.thesis.title }
			<Label color="teal">En revisión</Label> </Header>
			
			<PdfViewer />

			<Comments comments= { this.props['data']['comments'] }/>

			<Grid columns={2}>
			<Details />
			<AdditionalInformation />
			</Grid>
			</Container>
			);
	}
}

HomeStudent.defaultProps = {
	data: {
		thesis: {}
	}
}

export default HomeStudent
