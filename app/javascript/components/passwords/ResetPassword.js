import React from 'react'

import Http from '../../services/RestServices';

import queryString from 'query-string'
import { withRouter } from 'react-router-dom';
import { Form, Container, Button, Segment, Message, Grid, Header } from 'semantic-ui-react';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            emailError: null,
            emailErrorMessage: null
        };
        
        this.notifyError = this.notifyError.bind(this);
        this.submitEmailForm = this.submitEmailForm.bind(this);
        this.submitPasswordForm = this.submitPasswordForm.bind(this);
        this.emailOrPasswordField = this.emailOrPasswordField.bind(this);
        
        this.id = this.props.match.params.id;
        this.email = queryString.parse(this.props.location.search).email;
    }
    
    notifyError(result, message) {
        this.setState({
            emailError: result,
            emailErrorMessage: message
        });
    }
    
    linkToHome() {
        this.props.history.push("/");
    }
    
    submitEmailForm(event) {
        event.preventDefault();
        Http.post('/password_resets', new FormData(event.target))
        .then(response => {
            this.notifyError(false, "Cambie su contraseña con el link que fue enviado a su correo");
            
            setTimeout(() => {
                this.linkToHome();
            }, 500);
        })
        .catch(err => {
            this.notifyError(true, "El usuario con el correo ingresado no fue encontrado");
            console.log(err);
        });
        console.log(new FormData(event.target));
    }
    
    submitPasswordForm(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);
        data.append('email', this.email);
        
        if(data.get('password') == data.get('password_confirmation')) {
            Http.patch(`/password_resets/${this.id}`, data, false)
            .then(response => {
                this.notifyError(false, "Cambio de contraseña exitoso");
                
                setTimeout(() => {
                    this.linkToHome();
                }, 500);
            })
            .catch(err => {
                this.notifyError(true, err.message);
                console.log(err);
            });
        } else {
            this.notifyError(true, "Las contraseñas deben coincidir");
        }
    }
    
    emailOrPasswordField() {
        if(this.id == null || this.email == null)
        return <div>
        <Header as="h2">¿Olvidó su contraseña?</Header>
        <Container>
        <p>
        Escriba el email con el cual usaba su cuenta, en breves instantes
        le será enviado un correo para reestablecer su contraseña.
        </p>
        </Container>
        
        <Segment basic>
        <Form id="send_email_form" onSubmit={ this.submitEmailForm }>
        <Form.Input required type="email" name="email" error={ this.state.emailError }
        label="Email" placeholder="Email"/>
        <Form.Field control={ Button } type="submit" name="submit" color="teal">
        Cambiar contraseña</Form.Field>
        </Form>
        </Segment>
        </div>
        else
        return <div>
        <Header as="h2">Reestablecer contraseña</Header>
        
        <Form id="reset_password_form" onSubmit={ this.submitPasswordForm }>
        <Form.Input required type="password" name="password" error={ this.state.emailError }
        label="Nueva contraseña" placeholder="Nueva contraseña"/>
        <Form.Input required type="password" name="password_confirmation" error={ this.state.emailError }
        label="Confirmar nueva contraseña" placeholder="Nueva contraseña"/>
        
        <Form.Field control={ Button } type="submit" name="submit" color="teal">
        Cambiar contraseña</Form.Field>
        </Form>
        </div>;
    }
    
    render() {
        return <div className="reset-password-form">
        <Container fluid style={{ lineHeight: '32px' }} style={{height: '100%'}}>
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.reset-password-form {
            height: 100%;
        }
        `}</style>
        
        <Grid style={{ height: '100%' }} textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 650 }}>
        <Segment textAlign="left">
        
        { this.emailOrPasswordField() }
        
        {
            this.state.emailError === true ? 
            <Message id="message" error header='Error' 
            content={ this.state.emailErrorMessage } /> : 
            
            this.state.emailError === false ? 
            <Message positive header='Cambio de contraseña exitoso' 
            content={ this.state.emailErrorMessage } /> : 
            null
        }
        
        </Segment>
        </Grid.Column>
        </Grid>
        </Container>
        </div>;
    }
}

export default withRouter(ResetPassword)