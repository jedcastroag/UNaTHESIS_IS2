import React from "react"
import PropTypes from "prop-types"
import {Container, Header, List, Accordion} from "semantic-ui-react"
import Comment from "./Comment"
import PdfViewer from "../PdfViewer"
import Http from "../../services/RestServices"

const GET_PROJECTS_PATH = "/jury_projects";

class ShowProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {response: null};         
        this.getProjects();
    }  

    getProjects() {
        Http.get(GET_PROJECTS_PATH).then( response => {
            this.setState({response: response['data']});
        }).catch(error => console.log(error));
    }

    renderProjects() {
        if (this.state.response != null) {
            let list_items = this.state.response.map((title) => 
            <List.Item key={title} >
                <List.Content>
                    <List.Header>
                        {title}
                    </List.Header>
                </List.Content>
            </List.Item>
            );
            console.log(list_items);
            return list_items;
        }
        return 'Loading';
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

    renderSpace () {
        return <div style={{height: "100px"}}></div>;
    }

    render() {
        return (<Container>
                    <ShowProjects/>
                    {this.renderSpace()}
                    <PdfViewer title="agadgf"/>
                    {this.renderSpace()}
                    <Comment />
        </Container>);
    }
}

export default Home
