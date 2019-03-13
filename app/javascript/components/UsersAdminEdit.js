import React from "react"
import PropTypes from "prop-types"

import Http from '../services/RestServices'
import { Container } from 'react-grid-system';

import { Button, Form, Header, Input, Segment, Divider } from 'semantic-ui-react'

class UsersAdminEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [],
            user_id: props.location.query.user_id,
            user_type_id: '',
            name: '',
            surname: '',
            email: '',
            dni: ''
        }
    }

    submitForm(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        Http.post('/admin/edit_user', data).then(response => console.log()).then(() => window.location.href = '/admin/users')
            .catch(error => console.log("ERROR " + error));
    }
    componentDidMount() {
        Http.get('/admin/fetch_user_types').then(res => {
            for (var i = 0; i < res['data'].length; i++) {
                var type = res['data'][i]
                this.setState(prevState => ({
                    types: [...prevState.types, { key: type.id, value: type.id, text: type.name }]
                }))
            }
            Http.get(`/admin/fetch_user_data`, { params: { user_id: this.state.user_id } })
                .then(res => {
                    var user = res.data
                    this.setState(prevState => ({
                        user_type: user.user_type_id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        dni: String(user.dni)
                    }))
                })
        })
    }

    onChangeValue(type, value) {
        switch (type) {
            case 'name':
                this.setState(() => ({
                    name:value
                }))
                break;
            case 'surname':
                this.setState(() => ({
                    surname: value
                }))
                break;
            case 'dni':
                this.setState(() => ({
                    dni: value
                }))
                break;
            case 'email':
                this.setState(() => ({
                    email: value
                }))
                break;
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Segment>

                        <Header as="h2">Datos usuario</Header>
                        <Divider section />

                        <Form id="formUsuario" onSubmit={this.submitForm}>
                            <input type="hidden" name='id' value={this.state.user_id} />

                            <Form.Group widths='equal'>

                                <Form.Field required>
                                    <label>Nombre</label>
                                    <input type="text" placeholder='Nombre' name='name' value={this.state.name} onChange={(e,  value ) => this.onChangeValue('name', value)}/>
                                </Form.Field>
                                <Form.Field required>
                                    <label>Apellido</label>
                                    <input type="text" placeholder='Apellido' name="surname" value={this.state.surname} onChange={(e, value) => this.onChangeValue('surname', value)}/>
                                </Form.Field>

                            </Form.Group>
                            <Form.Group widths='equal'>

                                <Form.Field required>
                                    <label>Número de identificación</label>
                                    <input type="text" placeholder="Número de identificación" value={this.state.dni} name="dni" onChange={(e, value) => this.onChangeValue('dni', value)}></input>
                                </Form.Field>

                                <Form.Field required>
                                    <label>Email</label>
                                    <input type="text" placeholder='Email' name="email" value={this.state.email} onChange={(e, value) => this.onChangeValue('email', value)}/>
                                </Form.Field>
                                <Form.Field required>
                                    <label>Tipo usuario</label>
                                    <select name="user_type">
                                        {this.state.types.map((value, index) => {
                                            if (String(value.value) == String(this.state.user_type)) {
                                                return <option value={value.value} selected>{value.text}</option>

                                            }
                                            return <option value={value.value}>{value.text}</option>
                                        })}
                                    </select>
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <Button type='submit'>Editar usuario</Button>
                            </Form.Field>
                        </Form>
                        </Segment>
                </Container>
            </div>
        );
    }
}

export default UsersAdminEdit
