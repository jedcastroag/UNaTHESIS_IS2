import React from "react"
import PropTypes from "prop-types"

import Http from '../services/RestServices'
import { Container } from 'react-grid-system';

import { Button, Form, Header, Input, Segment, Divider, Grid } from 'semantic-ui-react'

class UsersAdminAdd extends React.Component {
    constructor(props) {
        super(props);

    }

    submitForm(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        Http.post('/admin/add_user', data).then(() => window.location.href = '/admin/users'
        ).catch(err => console.log(err));
    }
    reload = () => {
        this.componentDidMount();
    };
    render() {
        return (
            <div>
                <Container>
                    <Segment>

                        <Header as="h2">Datos usuario</Header>
                        <Divider section />

                        <Form id="formUsuario" onSubmit={this.submitForm}>
                            <Form.Group widths='equal'>

                                <Form.Field required>
                                    <label>Nombre</label>
                                    <input type="text" placeholder='Nombre' name='name' />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Apellido</label>
                                    <input type="text" placeholder='Apellido' name="surname" />
                                </Form.Field>

                            </Form.Group>
                            <Form.Group widths='equal'>

                                <Form.Field required label="Número de identificación"
                                    placeholder="Número de identificación" name="dni" control={Input} type="text" pattern="[0-9]*" />

                                <Form.Field required>
                                    <label>Email</label>
                                    <input type="text" placeholder='Email' name="email" />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Tipo usuario</label>
                                    <select name="user_type">
                                        <option value="1">Administrativo</option>
                                        <option value="2">Estudiante</option>
                                        <option value="3">Profesor</option>
                                    </select>
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <Button type='submit'>Añadir usuario</Button>
                            </Form.Field>
                        </Form>
                    </Segment>

                </Container>
            </div>
        );
    }
}

export default UsersAdminAdd
