import React from "react"
import PropTypes from "prop-types"
import {Container, Header, List, Grid, Segment} from "semantic-ui-react"
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
        this.getProjects();
    }  

    getProjects() {
        Http.get(GET_PROJECTS_PATH).then( response => {
            this.setState({response: response['data']});
            console.log(response.data);
        }).catch(error => console.log(error));
    }

    onClick (e, num) {
        console.log(e.target);
    }

    renderProjects() {
        if (this.state.response != null) {
            let list_items = this.state.response.map((project) => 
            <List.Item key={project.id} onClick={this.onClick} >
                <List.Content>
                    <Segment textAlign="center" raised>
                        <List.Header>
                            {project.title}
                        </List.Header>
                    </Segment>                    
                </List.Content>
            </List.Item>
            );
            console.log(list_items);
            return list_items;
        }
        return (<Segment loading></Segment>);
    }

    render() {
        return (<Container>
            <Header as='h2'>Projects</Header>
            <List animated verticalAlign="middle">
                { this.renderProjects() }
            </List>
        </Container>
        );
    }
}
    
class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            id_project_pdf: null,
            changeProject: null
        };
        this.setState({changeProject: this.getPDF.bind(this)});
    }

    renderSpace () {
        return <div style={{height: "100px"}}></div>;
    }

    getPDF(id_project_pdf) {
        this.setState({id_project_pdf: id_project_pdf});
    }

    render() {
        return (<Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="12">
                        <PdfViewer title="agadgf" id={this.state.id_project_pdf} />
                        {this.renderSpace()}
                        <Comment />
                    </Grid.Column>
                    <Grid.Column width="4">
                        <ShowProjects changeProject={this.state.changeProject}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>  
        </Container>);
    }
}

export default Home
