import React from 'react';
import PropTypes from "prop-types";

import Http from '../services/restservices';

import { Document, Page, StyleSheet } from 'react-pdf/dist/entry.webpack';
import PDFObject from 'pdfobject';

import { Container, Header, Label, Button } from 'semantic-ui-react';
import Comments from './Comments';

const GET_PDF_PATH = 'file/download_project';

class PDFViewer extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		console.log("Render child: " + this.props.pageNumber);

		return(
			<div>
			<Document file={GET_PDF_PATH}
			onLoadSuccess={ this.props.onDocumentLoadSuccess } >
			<Page pageNumber={ this.props.pageNumber } />
			</Document>
			</div>
			);
	}
}

class PDFContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numPages: null,
			pageNumber: 2,
		}

		this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
	}

	onDocumentLoadSuccess = (document) => {
		this.setState({
			numPages: document.numPages
		});
	}

	changePage = (offset) => this.setState(prevState => {
		pageNumber: prevState.pageNumber + offset
	});

	previousPage = () => this.changePage(-1);

	nextPage = () => {
		console.log("Next Page");
		this.changePage(1);
	}

	render() {
		return(
			<div>
			<PDFViewer pageNumber={ this.state.pageNumber } onDocumentLoadSuccess={ this.onDocumentLoadSuccess } />
			<Button primary onClick={ this.previousPage } >Previous</Button><Button secondary onClick={ this.nextPage }>Next</Button>
			</div>
			);
	}
}

class PDFEmbedded extends React.Component {
	componentDidMount() {
		const { pdfBlob, containerId } = this.props;
		Http.get(GET_PDF_PATH, { responseType: 'blob' })
		.then(response => {
			const url = URL.createObjectURL(response.data);
			PDFObject.embed(url, `#${containerId}`);
		}).catch(error => console.log("Error fetching project " + error));		
	}

	render() {
		const { width, height, containerId } = this.props;
		return <div style={{ width, height }} id={ containerId } />;
	}
}

PDFEmbedded.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	containerId: PropTypes.string,
};

PDFEmbedded.defaultProps = {
	width: '100%',
	height: 500,
	containerId: 'pdf-viewer'
};

class HomeStudent extends React.Component {
	constructor(props) {
		super(props);
	}

	renderPDF() {
		if(PDFObject.supportsPDFs)
			return <PDFEmbedded />;
		return <PDFContainer />;
	}

	render () {
		console.log(this.props);
		return (
			<Container text>
			<Header dividing as="h2">{ this.props.data.thesis.title } 
			<Label color="teal">En revisión</Label> </Header>
			<Header dividing as="h2">{ this.props.data.thesis.title }
			<Label color="teal">En revisión</Label> </Header>
			{ this.renderPDF() }
			<Comments comments= { this.props['data']['comments'] }/>
			
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
