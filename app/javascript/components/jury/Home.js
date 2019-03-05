import React from "react"
import PropTypes from "prop-types"
import {Container, Header, List, Grid, Icon, Segment} from "semantic-ui-react"
import Comment from "./Comment"
import PdfViewer from "../PdfViewer"
import Http from "../../services/RestServices"

const GET_PROJECTS_PATH = "/jury_projects";

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
                    onClick={this.onClick(project.id.toString(), project.title)}>
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
            const concept = {
            jury: {title: comment_title, 
                thesis_project_id: this.state.id_project,
                content: comment_content}
            };
            Http.post("/jury_comment", concept).then((response) => {
                alert(response.data.message);
            }).catch(error => console-log(error));
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
                            <Comment sendComment={this.sendComment}/>
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
