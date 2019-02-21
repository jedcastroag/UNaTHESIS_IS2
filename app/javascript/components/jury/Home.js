import React from "react"
import PropTypes from "prop-types"
import {Container, Grid, Form, Button} from "semantic-ui-react"
import Comment from "./Comment"
import PdfViewer from "../PdfViewer"

class Home extends React.Component {
    render() {
        return (<Container>
                    <PdfViewer title="agadgf"/>
                    <Comment />
        </Container>);
    }
}

export default Home
