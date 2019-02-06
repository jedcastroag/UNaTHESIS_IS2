import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

import auth from '../services/auth';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: null,
      passwordError: null
    }
  }

  render () {
    return (
      <div className="login-form">
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
        `}</style>
        <Grid style={{ height: '100%' }} textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="green" textAlign="center">
        Ingresa a tu cuenta
        </Header>
        <Form size="large" error>
        <Segment stacked>
        <Form.Input fluid icon="user" iconPosition="left" placeholder="Usuario" onChange={ this.updateEmail.bind(this) } value={ this.state.email } error={ this.state.emailError }/>
        <Form.Input fluid icon="lock" iconPosition="left" placeholder="Contraseña" type="password" onChange={ this.updatePassword.bind(this) } value={ this.state.password } error={ this.state.passwordError }/>

        { this.state.passwordError ? <Message id="message" error header='Error en la autenticación' content='El usuario y/o contraseña ingresados no son correctos' /> : null }

        <Button color="green" fluid size="large" type='submit' onClick={ this.login.bind(this) }>Login</Button>
        </Segment>
        </Form>
        </Grid.Column>
        </Grid>
        </div>
        );
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  login() {
    auth.login(this.state.email, this.state.password)
    .then((response) => {
      this.setState({passwordError: false, emailError: false});
      // this.props.updateAuth();
    }).catch((error) => {
      console.log("Bad credentials " + error.message);
      this.setState({passwordError: true, emailError: true});
    });
  }
}
