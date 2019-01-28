// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Button, Input, Checkbox, Form } from 'semantic-ui-react'
import '../../../dist/semantic.min.css';

const FormLogin = () => (
	<div class="ui cards">
		<div className="card-form" class="card">
			<div class="content">
				<div class="header">Sign in!</div>
				<div class="description">
					<Form>
						<Form.Field>
							<label>Username</label>
							<input placeholder='Username' />
						</Form.Field>
						<Form.Field>
							<label>Password</label>
							<input placeholder='Password' type="password" />
						</Form.Field>
						<Button type='submit'>Login</Button>
					</Form>
				</div>
			</div>
		</div>
	</div>
);

export default FormLogin

class Login extends React.Component {
	render() {
		return(
			<div className="full-login" class="ui middle aligned center aligned grid">
				<FormLogin />
			</div>
			);
		}
}

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
	<div>
		<Login />
	</div> ,
	document.body.appendChild(document.createElement('div')),
	)
	})
