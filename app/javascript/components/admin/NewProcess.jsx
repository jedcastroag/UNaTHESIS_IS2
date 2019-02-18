import React from "react"
import PropTypes from "prop-types"
import AddUser from "../../services/SendToServer"
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message,
    Container
} from 'semantic-ui-react'

class NewProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
    }

    onChange(e) {
        this.setState({email: e.target.value});
    }

    sendData() {
        AddUser.addData("/process", this.state).then((response) => console.log(response)).catch((error) => console.log(error));
    }

    render() {
        // method="post" action="/process"
        return (<Container>
            <Grid style={{height: '100%'}} verticalAlign="middle">
                <Grid.Row >
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                        <Form id="new_process_form" size="large" error onSubmit={this.sendData.bind(this)}>
                            <Segment stacked>
                                <Form.Input label='Usuario del Estudiante' type='text' name="email" onChange={this.onChange.bind(this)}/>
                                <Button type="submit">Iniciar</Button>
                            </Segment>
                        </Form>
                        <Header as="h3">{this.state.email}</Header>
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>

        </Container>)
    }

}

NewProcess.propTypes = {
    email: PropTypes.string
};
export default NewProcess
