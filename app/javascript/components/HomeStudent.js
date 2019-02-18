import React from 'react';
import PropTypes from "prop-types";

import { 
	Container, Header, Label, Button, Grid, Card, Feed, List, Image, Icon 
} from 'semantic-ui-react';

import Comments from './Comments';
import PdfViewer from './PdfViewer';

import defaultIcon from '../../assets/images/jury.jpg';

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
			<Grid.Column><Details /></Grid.Column>
			<Grid.Column><AdditionalInformation /></Grid.Column>
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
