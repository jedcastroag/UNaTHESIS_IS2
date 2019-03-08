import React from "react"
import PropTypes from "prop-types"
import {Container, Header, List, Grid, Icon, Segment} from "semantic-ui-react"
import Comment from "./Comment"
import PdfViewer from "../PdfViewer"
import Question from "./Question"
import Http from "../../services/RestServices"

const GET_PROJECTS_PATH = "/jury_projects";
const POST_COMMENT_PATH = "/jury_comment";
const POST_QUESTIONS_PATH = "/jury_questions";

class ShowProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            changeProject: this.props.changeProject
        };         
        this.onClick = this.onClick.bind(this);
    }  

    componentDidMount() {
        Http.get(GET_PROJECTS_PATH).then( response => {
            this.setState({response: response['data']});
        }).catch(error => console.log(error));
    }

    onClick = (id, title) => () => {
        this.props.changeProject(id, title);
    }

    renderProjects() {
        if (this.state.response != null) {
            let list_items = this.state.response.map((project) => 
                <Segment textAlign="center" 
                    key={project.id} 
                    textAlign="center"
                    style={{cursor: "pointer"}}
                    onClick={this.onClick(project.id, project.title)}>
                    {project.title}
                </Segment>
            );
            return list_items;
        }
        return (<Segment loading style={{height: "200px"}}></Segment>);
    }

    render() {
        return (<Container>
            <Header as='h2'>Projects</Header>
            <Segment.Group>
                { this.renderProjects() }
            </Segment.Group>
        </Container>
        );
    }
}
    
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
                console.log(response.data);
            }).catch(error => console.log(error));
        }
    }

    renderPdf () {
        if (this.state.title_project != null && this.state.id_project != null) {
            return <PdfViewer title={this.state.title_project} 
                project_id={this.state.id_project} 
                key = {this.state.project_id} />
        }
        return <Segment placeholder style={{height: "530px"}}>
            <Header icon>
                <Icon name="pdf file outline" />
                No Project selected
            </Header>
        </Segment>
    }

    render() {
        return (<Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={11}>  
                        <Segment>
                            <Header as="h3" content="Document"/>
                            {this.renderPdf()}
                            {this.renderSpace()}
                            <Header as="h3" content="Concept"/>
                            <Comment sendComment={this.sendComment} project_id={this.state.id_project} />
                            {this.renderSpace()}
                            <Header as="h3" content="Questions"/>
                            <Question sendQuestions={this.sendQuestions} project_id={this.state.id_project} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Segment raised>
                            <ShowProjects changeProject={this.getPDF}/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>  
        </Container>);
    }
}

export default Home
