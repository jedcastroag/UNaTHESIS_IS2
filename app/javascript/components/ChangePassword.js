import React from 'react'

import { Form, Container, Button, Segment } from 'semantic-ui-react';

import Http from '../services/RestServices';

class ChangePassword extends React.Component {
    submitForm(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        Http.post('/change_password', data).then(response => console.log(response))
        .catch(err => console.log(err));
    }

    render() {
        return <Container>
        <Segment>
        <Form id="change_password_form" onSubmit={this.submitForm}>
        <Form.Input required type="password" key="current_password" label="Contraseña actual" 
        placeholder="Contraseña actual" compact/>
        <Form.Input required type="password" key="new_password" 
        label="Escriba su nueva contraseña" placeholder="Nueva contraseña" />
        <Form.Input required type="password" key="new_password_confirmation" 
        label="Escriba nuevamente su nueva contraseña" placeholder="Nueva contraseña" />
        <Form.Field control={ Button } type="submit" key="submit" color="teal">Cambiar contraseña</Form.Field>
        </Form>
        </Segment>
        </Container>;
    }
}

export default ChangePassword