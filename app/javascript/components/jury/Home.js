import React from "react"
import PropTypes from "prop-types"
import {Container, Header, Select, Grid, Icon, Segment} from "semantic-ui-react"
import Comment from "./Comment"
import PdfViewer from "../PdfViewer"
import Question from "./Question"
import Http from "../../services/RestServices"

const GET_PDF_PATH = "jury/download/"
const GET_PROJECTS_PATH = "jury/projects";
const POST_COMMENT_PATH = "jury/comment";
const POST_QUESTIONS_PATH = "jury/questions";

class ShowProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects :[{text: "No tiene proyectos asignados aún"}],
            hasProjects: false
        };
        this.getSelectOption = this.getSelectOption.bind(this);
    }  

    componentDidMount() {
        Http.get(GET_PROJECTS_PATH).then( response => {
            this.setState({
                projects: response.data.map((obj, idx) => ({
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
        this.getPDF = this.getPDF.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.sendQuestions = this.sendQuestions.bind(this);
        this.renderSpace = this.renderSpace.bind(this);
        this.renderPdf = this.renderPdf.bind(this);
    }

    renderSpace () {
        return <div style={{height: "10px"}}></div>;
    }

    getPDF(id_project_pdf, title) {
        this.setState({
            id_project: id_project_pdf,
            title_project: title
        });
    }

    sendComment (comment_content, comment_title, e) {        
        if (this.state.id_project == null) {
            alert("Choose a Project");
        } else {
            const data = {
            jury: {title: comment_title, 
                thesis_project_id: this.state.id_project,
                content: comment_content}
            };
            Http.post(POST_COMMENT_PATH, data).then((response) => {
                alert(response.data.message);
            }).catch(error => console-log(error));
        }
    }

    sendQuestions (questions) {
        if (this.state.id_project == null) {
            alert("Choose a Project");
        } else {
            const data = {
                jury: {
                    questions: questions,
                    thesis_project_id: this.state.id_project
                }
            };
            Http.post(POST_QUESTIONS_PATH, data).then(response => {
                alert(response.data.message);
            }).catch(error => console.log(error));
        }
    }

    renderPdf () {
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
                            <Comment sendComment={this.sendComment} project_id={this.state.id_project} />
                            {this.renderSpace()}
                            <Header as="h3" content="Proguntas" dividing/>
                            <Question sendQuestions={this.sendQuestions} project_id={this.state.id_project} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>  
        </Container>);
    }
}

export default Home
