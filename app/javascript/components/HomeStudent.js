import React from 'react';
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { 
	Container, Header, Label, Button, Grid, Card, Feed, List, Image, Icon, Segment
} from 'semantic-ui-react';

import Comments from './Comments';
import PdfViewer from './PdfViewer';

import defaultIcon from '../../assets/images/jury.jpg';

const GET_PDF_PATH = 'student/download_project';

class Details extends React.Component {
	render () {
		return(<h1>Details</h1>);
	}
}

class AdditionalInformation extends React.Component {
	render () {
		return(
			<Card>
			<Card.Content>
			<Card.Header>Additional info</Card.Header>
			</Card.Content>
			<Card.Content>
			<Header as='h4'>Tutor</Header>
			
			<List horizontal>
			<List.Item>
			<Image avatar src={ defaultIcon } />
			<List.Content>
			<List.Header>Tutor 1</List.Header>
			</List.Content>
			</List.Item>
			</List>

			<Header as='h4'>Jurados</Header>

			<List animated horizontal>
			<List.Item>
			<Image avatar src={ defaultIcon } />
			<List.Content>
			<List.Header>Jurado 1</List.Header>
			Por confirmar
			</List.Content>
			</List.Item>

			<List.Item>
			<Image avatar src={ defaultIcon } />
			<List.Content>
			<List.Header>Jurado 2</List.Header>
			Por confirmar
			</List.Content>
			</List.Item>

			<List.Item>
			<Image avatar src={ defaultIcon } />
			<List.Content>
			<List.Header>Jurado 3</List.Header>
			Por confirmar
			</List.Content>
			</List.Item>

			</List>
			</Card.Content>
			</Card>
			);
	}
}

class NoThesisFound extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(<Container>
			<Segment placeholder>
			<Header icon>
			  <Icon name='file alternate outline' />
			  Aún no has cargado tu proyecto de tesis.
			</Header>
			<Button primary onClick={this.props.linkToAddDocument}>
			Añadir documento
			</Button>
		  </Segment>
		</Container>);
	}
}

class HomeStudent extends React.Component {
	constructor(props) {
		super(props);
		this.linkToAddDocument = this.linkToAddDocument.bind(this);
	}

	linkToAddDocument() {
		this.props.history.push('/project/load');
	}

	checkIfThesisExists() {
		if(this.props.thesis == null) {
			return <NoThesisFound linkToAddDocument={this.linkToAddDocument}/>;
		} else {
			return (
			<Container text>
			<Header dividing as="h2">{ this.props.data.thesis ? this.props.data.thesis.title : "null" } 
			<Label color="teal">En revisión</Label> </Header>
			
			<PdfViewer url={ GET_PDF_PATH } title={ this.props.data.thesis ? this.props.data.thesis.title : "null" } />

			<Comments comments= { this.props['data']['comments'] }/>

			<Grid columns={2}>
			<Grid.Column><Details /></Grid.Column>
			<Grid.Column><AdditionalInformation /></Grid.Column>
			</Grid>
			</Container>
			);
		}
	}

	render () {
		return this.checkIfThesisExists();
	}
}

HomeStudent.defaultProps = {
	data: {
		thesis: {
			title: "default"
		},
		comments: [],
		users: {}
	}
}

export default withRouter(HomeStudent)
