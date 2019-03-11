import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types'
import { Button, Form, Grid, Header, Segment, Message, Container } from 'semantic-ui-react'

import auth from '../services/Auth';

class OnlyLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: null,
      passwordError: null
    }
  }

  render() {
    return (
      <Form size="large" error>
      <Segment stacked>
      <Form.Input fluid icon="user" iconPosition="left" placeholder="Usuario" onChange={ this.updateEmail.bind(this) } value={ this.state.email } error={ this.state.emailError }/>
      <Form.Input fluid icon="lock" iconPosition="left" placeholder="Contraseña" type="password" onChange={ this.updatePassword.bind(this) } value={ this.state.password } error={ this.state.passwordError }/>

      { this.state.passwordError === true ? <Message id="message" error header='Error en la autenticación' content='El usuario y/o contraseña ingresados no son correctos' /> : null }
      { this.state.passwordError === false ? <Message positive header='Autenticación exitosa' content='En breve será redirigido a la página de inicio' /> : null }

      <Button color="green" fluid size="large" type='submit' onClick={ this.login.bind(this) }>Login</Button>
      </Segment>
      </Form>
      );
  };

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  login() {
    auth.login(this.state.email, this.state.password)
    .then((response) => {
      this.setState({ passwordError: false, emailError: false });
      this.props.updateAuth();
    }).catch((error) => {
      this.setState({ passwordError: true, emailError: true });
    });
  }
}

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.checkIfIsAuthenticated = this.checkIfIsAuthenticated.bind(this);
  }

  render () {
    let authenticated = this.checkIfIsAuthenticated();

    if(authenticated === false) {
      return (
        <div className="login-form">
        
        <Container fluid style={{ lineHeight: '32px' }} style={{height: '100%'}}>
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
          <OnlyLoginForm updateAuth={ this.checkIfIsAuthenticated }/>
          </Grid.Column>
          </Grid>

          </Container>
          </div>
          );
    } else {
      return authenticated;
    }
  }

  checkIfIsAuthenticated() {
    if(auth.isAuthenticated()) {
      this.props.updateAuth();
      // const { referrer } = this.props.location.state || { referrer: { pathname: "/" }};
      const { referrer } = { referrer: { pathname: "/" }};
      return <Redirect to={ referrer } />;
    }

    return false;
  }
}
