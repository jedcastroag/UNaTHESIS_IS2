import React from "react"
import PropTypes from "prop-types"

import Http from '../services/RestServices'
import { Container, Row, Col } from 'react-grid-system';

import { Button, Input, Checkbox, Form } from 'semantic-ui-react'

class UsersAdminAdd extends React.Component {
    constructor(props) {
        super(props)   
    }
    
    submitForm(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        Http.post('/admin/add_user', data).then().then(res => {
            window.location.reload()
        })
    }
    
    render() {
        return (
            <div>
            <Container>
            <h2 class="ui header">Datos usuario</h2>
            <div class="datos_usuario">
            
            <Form id="formUsuario" onSubmit={this.submitForm}>
            <Form.Group widths='equal'>
            
            <Form.Field >
            <label>Nombre</label>
            <input type="text" placeholder='Nombre' name='name'/>
            </Form.Field>
            <Form.Field>
            <label>Apellido</label>
            <input type="text" placeholder='Apellido' name="surname"/>
            </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
            
            <Form.Field>
            <label>Email</label>
            <input type="text" placeholder='Email' name="email"/>
            </Form.Field>
            <Form.Field>
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
            </div>
            </Container>
            </div>
            );
        }
    }
    
    export default UsersAdminAdd
    