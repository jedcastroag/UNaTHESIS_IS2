import React from 'react'

import { Form, Container, Button, Segment } from 'semantic-ui-react';

import Http from '../services/RestServices';

import { withRouter } from 'react-router-dom';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    linkToHome() {
        this.props.history.push("/");
    }

    submitForm(event) {
        event.preventDefault();
        Http.post('/change_password', new FormData(event.target))
        .then(response => this.linkToHome())
        .catch(err => console.log(err));
    }

    render() {
        return <Container>
        <Segment>
        <Form id="change_password_form" onSubmit={ this.submitForm }>
        <Form.Input required type="password" name="current_password" 
        label="Contraseña actual" placeholder="Contraseña actual"/>
        <Form.Input required type="password" name="new_password" 
        label="Escriba su nueva contraseña" placeholder="Nueva contraseña" />
        <Form.Input required type="password" name="new_password_confirmation" 
        label="Escriba nuevamente su nueva contraseña" placeholder="Nueva contraseña" />
        <Form.Field control={ Button } type="submit" name="submit" color="teal">
        Cambiar contraseña</Form.Field>
        </Form>
        </Segment>
        </Container>;
    }
}

export default withRouter(ChangePassword)