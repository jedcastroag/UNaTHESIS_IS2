import React from "react"
import PropTypes from "prop-types"
import {Container, Header, List} from "semantic-ui-react"
import Comment from "./Comment"
import PdfViewer from "../PdfViewer"
import Http from "../../services/RestServices"

const GET_PROJECTS_PATH = "/jury_projects";

class ShowProjects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {response: null}; 
        this.getProjects();   
        console.log("Constructor");
    }

    getProjects() {
        console.log("getting project...");
        Http.get(GET_PROJECTS_PATH).then( response => {
            console.log(response);
            this.setState({response: response.data});
        }).catch(error => console.log(error));
    }

    renderProjects() {
        let list_items = this.state.response.map(title => <List.Item>title</List.Item> );
        return list_items;
    }

    render() {
        return (<Container>
            <List animated verticalAlign="middle">
                { this.renderProjects() }
            </List>
        </Container>
        );
    }
}

class Home extends React.Component {
    render() {
        return (<Container>
                    <ShowProjects/>
                    <PdfViewer title="agadgf"/>
                    <div style={{height: "100px"}}></div>
                    <Comment />
        </Container>);
    }
}

export default Home
