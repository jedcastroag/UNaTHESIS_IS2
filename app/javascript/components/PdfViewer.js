import React from "react"
import PropTypes from "prop-types"

import { Document, Page, PDFDownloadLink } from 'react-pdf/dist/entry.webpack';
import PDFObject from 'pdfobject';

import { Button } from 'semantic-ui-react';

import Http from '../services/RestServices';

const GET_PDF_PATH = 'file/download_project';

class PDFRenderizer extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return(
			<div>
			<Document file={ this.props.projectUrl }
			onLoadSuccess={ this.props.onDocumentLoadSuccess } >
			<Page pageNumber={ this.props.pageNumber } width={350} />
			</Document>
			</div>
			);
	}
}

class PDFRenderizerContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			numPages: null,
			pageNumber: 1,
			prevEnabled: true,
			nextEnabled: true
		}

		this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
	}

	onDocumentLoadSuccess = (document) => {
		this.setState({
			numPages: document.numPages
		});
		this.changePage(0);
	}

	changePage(offset) {
		this.setState((state, props) => {
			if(state.numPages == undefined) return {};

			var nEnabled = !((state.pageNumber + offset + 1) > state.numPages);
			var pEnabled = !((state.pageNumber + offset - 1) < 1);

			return {
				pageNumber: state.pageNumber + offset,
				prevEnabled: pEnabled,
				nextEnabled: nEnabled
			};
		});
	}

	previousPage = () => this.changePage(-1);

	nextPage() {
		this.changePage(1);
	};

	showButtons = () => {
		if(this.state.numPages != null)
			return <React.Fragment>
		<Button.Group fluid compact>
		<Button primary onClick={ this.previousPage } disabled={ !this.state.prevEnabled }>Anterior</Button>
		<Button secondary onClick={ this.nextPage } disabled={ !this.state.nextEnabled }>Siguiente</Button>
		</Button.Group>
		</React.Fragment>;
	}

	render() {
		return(
			<div>
			<PDFRenderizer pageNumber={ this.state.pageNumber }
			onDocumentLoadSuccess={ this.onDocumentLoadSuccess }
			projectUrl={ this.props.projectUrl } />

			{ this.showButtons() }
			</div>
			);
		}
	}
	
	class PDFEmbedded extends React.Component {
		constructor(props){
			super(props);
			this.pdfShowed = false;
		}
		
	componentDidMount() {
		const { containerId } = this.props;
		if(this.props.projectUrl != null)
			PDFObject.embed(this.props.projectUrl, `#${containerId}`);
		}

	render() {
		if(!this.pdfShowed && this.props.projectUrl != null) {
			this.componentDidMount();
		}
		
		const { width, height, containerId } = this.props;
		return <div style={{ width: this.props.width, height: this.props.height }} id={ containerId } />;
	}
}

PDFEmbedded.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	containerId: PropTypes.string,
};

PDFEmbedded.defaultProps = {
	width: '100%',
	height: '500px',
	containerId: 'pdf-viewer'
};

class PdfViewer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			projectUrl: null
		};
		this.downloadPDF();
		this.savePDF = this.savePDF.bind(this);
	}
	componentDidUpdate(prevProps) {
		if (this.props.project_id != prevProps.project_id) {
			this.downloadPDF();			
		}
	}
	
	downloadPDF() {
		const params = {responseType: 'blob', params:{id: this.props.project_id}};
		Http.get(GET_PDF_PATH, params)
		.then(response => {
			this.setState({ projectUrl: URL.createObjectURL(response.data) });
		}).catch(error => console.log("Error fetching project " + error));
	}
	
	savePDF() {
		if(this.state.projectUrl != null){
			var url = this.state.projectUrl;
			
			var anchorElem = document.createElement("a");
			anchorElem.style = "display: none";
			anchorElem.href = url;
			// console.log(this.props.data);
			anchorElem.download = this.props.title;

			document.body.appendChild(anchorElem);
			anchorElem.click();
			
			document.body.removeChild(anchorElem);
		}
	}

	renderPDF() {
		if(PDFObject.supportsPDFs)
		return <PDFEmbedded projectUrl={ this.state.projectUrl }/>;
		return <PDFRenderizerContainer projectUrl={ this.state.projectUrl }/>;
	}
	
	render () {
		return (
			<React.Fragment>
			{ this.renderPDF() }
			<Button basic compact attached='bottom' onClick={ this.savePDF }>Descargar</Button>
			</React.Fragment>
			);
		}
	}

export default PdfViewer
