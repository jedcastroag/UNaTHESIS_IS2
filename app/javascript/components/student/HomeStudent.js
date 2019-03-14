import React from 'react';
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { 
	Container, Header, Label, Button, Grid, Divider, List, Image, Icon, Segment
} from 'semantic-ui-react';

import Comments from './Comments';
import PdfViewer from '../common/PdfViewer';

import defaultIcon from '../../../assets/images/jury.jpg';

const GET_PDF_PATH = 'student/download_project';

class Details extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return <Segment basic>
		<Header as="h3">Detalles</Header>
		<Header as="h5">Fecha de creación del proyecto: { this.props.creation } </Header>
		<Header as="h5">Ultima actualización: { this.props.update } </Header>
		</Segment>;
	}
}

class AdditionalInformation extends React.Component {
	constructor(props){
		super(props);
		this.tutors = [];
		this.juries = [];
		this.authors = [];
		
		for(var user of this.props.relatedUsers) {
			switch(user.role) {
				case 1: // Author
				this.authors.push(user);
				break;
				case 2: // Tutor
				this.tutors.push(user);
				break;
				case 3: // Jury
				this.juries.push(user);
				break;
			}
		}
	}
	
	renderAnotherAutors() {
		if(this.authors.length > 0)
		return <div>
		<Header as='h4'>Otros autores</Header>
		<List horizontal>
		{ 
			this.authors.map(function(item, key) {
				return <List.Item key={ key }>
				<Image avatar src={ defaultIcon } />
				<List.Content>
				<List.Header>{ item.name + " " + item.surname }</List.Header>
				{ item.confirmed ? null : "Por confirmar" }
				</List.Content>
				</List.Item>;
			}) 
		}
		</List>
		</div>;
		
		return null;
	}
	
	renderTutors() {
		if(this.tutors.length > 0)
		return <List horizontal>
		{
			this.tutors.map(function(item, key) {
				return <List.Item key={ key }>
				<Image avatar src={ defaultIcon } />
				<List.Content>
				<List.Header>{ item.name + " " + item.surname }</List.Header>
				{ item.confirmed ? null : "Por confirmar" }
				</List.Content>
				</List.Item>;
			}) 
		}
		</List>;
		return <Label>Aún no has asignado tutores para este proyecto</Label>;
	}
	
	renderJuries() {
		if(this.juries.length > 0)
		return <List animated horizontal>
		{ 
			this.juries.map(function(item, key) {
				return <List.Item key={ key }>
				<Image avatar src={ defaultIcon } />
				<List.Content>
				<List.Header>{ item.name + " " + item.surname }</List.Header>
				{ item.confirmed ? null : "Por confirmar" }
				</List.Content>
				</List.Item>;
			}) 
		}
		</List>;
		return <Label>Aún no han sido asignados jurados para este proyecto</Label>;
	}
	
	render () {		
		return(
			<Segment basic>
			<Header as="h3">Información</Header>
			
			{ this.renderAnotherAutors() }
			
			<Header as='h4'>Tutores</Header>
			
			{ this.renderTutors() }
			
			<Header as='h4'>Jurados</Header>
			
			{ this.renderJuries() }
			</Segment>
			);
		}
	}
	
	class NoThesisFound extends React.Component {
		constructor(props) {
			super(props);
		}
		
		render() {
			return <Container>
			<Segment placeholder>
			<Header icon>
			<Icon name='file alternate outline' />
			Aún no has cargado tu proyecto de tesis.
			</Header>
			<Button primary onClick={ this.props.linkToAddDocument }>
			Añadir documento
			</Button>
			</Segment>
			</Container>;
		}
	}
	
	class HomeStudent extends React.Component {
		constructor(props) {
			super(props);
			this.linkToAddDocument = this.linkToAddDocument.bind(this);
		}
		
		linkToAddDocument() {
			this.props.history.push({
				pathname: '/project/load',
				thesis: this.props.data.thesis
			});
		}
		
		checkIfThesisExists() {			
			if(this.props.data.thesis == null || this.props.data.thesis.document == null || this.props.data.thesis.document == "") {
				return <NoThesisFound linkToAddDocument={ this.linkToAddDocument }/>;
			} else {
				return <Container text>
				<Header dividing as="h2">{ this.props.data.thesis.title || "[Tesis sin título]" } 
				{ this.props.data.thesis.approbation_state ? <Label color="red">Aprobada</Label> : 
				<Label color="teal">En revision</Label> } </Header>
				
				<PdfViewer url={ GET_PDF_PATH } title={ this.props.data.thesis.title || "[Tesis sin título]" } />
				
				<Comments comments={ this.props['data']['comments'] } title="Comentarios"/>

				{ this.props.data.thesis.approbation_state ? <Comments comments={ this.props['data']['questions'] } title="Preguntas"/> : null }
				
				<Segment>
				<Grid columns='2' stackable>
				<Divider vertical><Icon name='university' size="big" /></Divider>
				<Grid.Column><Details creation={this.props.data.thesis.created_at} update={this.props.data.thesis.updated_at}/></Grid.Column>
				<Grid.Column verticalAlign="middle">
				<AdditionalInformation relatedUsers={ this.props.data.users }/>
				</Grid.Column>
				</Grid>
				</Segment>
				</Container>;
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
			questions: [],
			users: {}
		}
	}
	
	export default withRouter(HomeStudent)
	