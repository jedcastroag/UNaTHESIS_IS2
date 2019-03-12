import React from 'react'

import Http from '../services/RestServices';

import queryString from 'query-string'
import { withRouter } from 'react-router-dom';
import { Form, Container, Button, Segment } from 'semantic-ui-react';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.email = queryString.parse(this.props.location.search).email;
        this.id = this.props.match.params.id;
    }
    
    linkToHome() {
        this.props.history.push("/");
    }
    
    submitForm(event) {
        event.preventDefault();
        Http.post('/password_resets', new FormData(event.target))
        .then(response => this.linkToHome())
        .catch(err => console.log(err));
    }
    
    render() {
        return <Container>
        <Segment>
        <Form id="reset_password_form" onSubmit={ this.submitForm }>
        <Form.Input required type="email" name="email" 
        label="Email" placeholder="Email"/>
        <Form.Field control={ Button } type="submit" name="submit" color="teal">
        Cambiar contraseña</Form.Field>
        </Form>
        </Segment>
        </Container>;
    }
}

export default withRouter(ResetPassword)