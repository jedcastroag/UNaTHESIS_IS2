import React from "react"
import PropTypes from "prop-types"
import {Container, Header, Select, Grid, Icon, Segment} from "semantic-ui-react"
import Comment from "./Comment"
import PdfViewer from "../common/PdfViewer"
import Question from "./Question"
import StudentInfo from "./ShowStudentInfo";
import Http from "../../services/RestServices"

const GET_PDF_PATH = "jury/download/"
const GET_PROJECTS_PATH = "jury/projects";

class ShowProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects :[],
            hasProjects: false
        };
        this.getSelectOption = this.getSelectOption.bind(this);
    }  

    componentDidMount() {
        Http.get(GET_PROJECTS_PATH).then( response => { 
            this.setState({
                projects: response.data.length == 0? [{text: "No tiene proyectos asignados aún", key:"null"}] : response.data.map((obj, idx) => ({
                    text: obj.title,
                    value: idx,
                    key: obj.id,
                })),
                hasProjects: true
            });
        }).catch(error => console.log(error));
    }

    getSelectOption = (e, {name, value}) => {
        const project = this.state.projects[value];
        if (project == null) return;
        this.props.changeProject(project.key, project.text);
    }

    render() {
        return (<Container>
            <Select 
            name="project"
            placeholder="Seleccione un Proyecto"
            onChange={this.state.hasProjects ? this.getSelectOption : null}
            options={this.state.projects} />
        </Container>
        );
    }
}
    
//-----------------------------------------------------------------------------

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id_project: null,
            title_project: null
        };
    }

    renderSpace = () => {
        return <div style={{height: "10px"}}></div>;
    }

    getPDF = (id_project_pdf, title) => {
        this.setState({
            id_project: id_project_pdf,
            title_project: title
        });
    }

    renderPdf = () => {
        if (this.state.title_project != null && this.state.id_project != null) {
            return <PdfViewer title={this.state.title_project} 
                url={GET_PDF_PATH + this.state.id_project}
                key = {this.state.project_id} />
        }
        return <Segment placeholder style={{height: "530px"}}>
            <Header icon>
                <Icon name="pdf file outline" />
                No se ha seleccionado ningún proyecto
            </Header>
        </Segment>
    }

    render() {
        return (<Container>

            <StudentInfo thesis_project_id={this.state.id_project}/>
            {this.renderSpace()}
            <Header content="Proyectos" dividing />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={9}>  
                        <Segment>
                            <Header as="h3" content="Documento"/>
                            <ShowProjects changeProject={this.getPDF}/>
                            {this.renderSpace()}
                            {this.renderPdf()}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Segment raised>
                            <Header as="h3" content="Concepto"/>
                            <Comment project_id={this.state.id_project} />
                            {this.renderSpace()}
                            <Header as="h3" content="Preguntas" dividing/>
                            <Question project_id={this.state.id_project} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>  
        </Container>);
    }
}

export default Home
