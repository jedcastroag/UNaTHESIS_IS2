import React from "react"
import PropTypes from "prop-types"
import {Container, Grid, Form, Button} from "semantic-ui-react"
import Comment from "./Comment"
import PdfViewer from "../PdfViewer"

class Home extends React.Component {
    render() {
        return (<Container>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                    <PdfViewer/>
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                    <Comment />
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>
        </Container>);
    }
}

export default Home
