import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import '../../../dist/semantic.min.css';

class LoginForm extends React.Component {
  render () {
    return (
      <div className="login-form">
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 80%;
        }
        `}</style>
        <Grid style={{ height: '100%' }} textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="green" textAlign="center">
        Ingresa a tu cuenta
        </Header>
        <Form size="large">
        <Segment stacked>
        <Form.Input fluid icon="user" iconPosition="left" placeholder="Usuario"/>
        <Form.Input fluid icon="lock" iconPosition="left" placeholder="Contraseña" type="password"/>

        <Button color="green" fluid size="large" type='submit'>Login</Button>
        </Segment>
        </Form>
        </Grid.Column>
        </Grid>
        </div>
        );
  }
}

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};

export default LoginForm

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<LoginForm />,
	document.body.appendChild(document.createElement('div')),
	)
	})