import React from "react"
import PropTypes from "prop-types"
import { Table } from 'semantic-ui-react'
import Http from '../services/RestServices'
import { Container, Row, Col } from 'react-grid-system';

import { Button, Input, Checkbox, Form } from 'semantic-ui-react'


class UsersAdminEdit extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state =
            {
                user: this.props.location.state.user,
                name : '', surname : '', email : '', user_type : '', id : ''
            }
    }
    componentDidMount() {

        Http.get(`/admin/fetch_user_data`, {
            params: {
                user_id: this.state.user
            }
        }).then(res => {
                this.setState({
                    name: res.data.name,
                    surname: res.data.surname,
                    email: res.data.email,
                    user_type: res.data.user_type,
                    id: res.data.id
                })
            
        })

    }
    submitForm(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        Http.post('/admin/edit_user', data).then().catch(error =>
            console.log("ERROR " + error)
        );
    }
    onTodoChange(value) {
        console.log(value)
        this.setState({
            user_data: user_data.name
        });
    }
    

    render() {
        return (
            <div>
                <Container>
                    <h2 class="ui header">Datos usuario</h2>
                    <div class="datos_usuario">

                        <Form id="formUsuario" onSubmit={this.submitForm}>
                            <Form.Group widths='equal'>

                                <Form.Field onChange={(e) => this.setState({ name: e.target.value })}>
                                    <input type="hidden" name='id' value={this.state.id} />

                                    <label>Nombre</label>
                                    <input type="text" placeholder='Nombre' name='name' value={this.state.name} />
                                </Form.Field>
                                <Form.Field onChange={(e) => this.setState({ surname: e.target.value })}>
                                    <label>Apellido</label>
                                    <input type="text" placeholder='Apellido' name="surname" value={this.state.surname} />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>

                                <Form.Field onChange={(e) => this.setState({ email: e.target.value })}>
                                    <label>Email</label>
                                    <input type="text" placeholder='Email' name="email" value={this.state.email} />
                                </Form.Field>
                                <Form.Field onChange={(e) => this.setState({ user_type: e.target.value })}>
                                    <label>Tipo usuario</label>
                                    <select name="user_type" value={this.state.user_type} >
                                        <option value="1">Administrativo</option>
                                        <option value="2">Estudiante</option>
                                        <option value="3">Profesor</option>
                                    </select>
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <Button type='submit'>Editar usuario</Button>
                            </Form.Field>
                        </Form>
                    </div>
                </Container>
            </div>
        );
    }
}


export default UsersAdminEdit
