import React from "react"
import PropTypes from "prop-types"
import AddUser from "../../services/AddUser"
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
            email: "",
        }
    }

    onChange(e) {
        this.setState({email: e.target.value});
    }

    sendData() {
        AddUser.add_user(this.state.email).then((response) => console.log(response)).catch((error) => console.log(error));
    }

    render() {
        // method="post" action="/process"
        return (
            <div>
            <Form id="new_process_form" size="large" error onSubmit={this.sendData.bind(this)}>
            <Segment stacked>
                <Form.Input label='Usuario del Estudiante' type='text' name="email" onChange={this.onChange.bind(this)}/>
                <Button type="submit">Iniciar</Button>
            </Segment>
        </Form>

        <Header as="h3">{this.state.email}</Header>
    </div>)
    }

}

NewProcess.propTypes = {
    email: PropTypes.string
};
export default NewProcess
