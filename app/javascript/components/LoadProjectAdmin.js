import React from "react"
import PropTypes from "prop-types"

import { Button, Form, Select } from 'semantic-ui-react'
import { Container, Row, Col } from 'react-grid-system';

import Http from '../services/RestServices'

const users = []
const roles = []

const set_usuario = (event, value) => {
    document.getElementById('user_' + String(value.id)).value = value.value
}

const set_tipo_usuario = (event, value) => {
    document.getElementById('user_type_' + String(value.id)).value = value.value
}

const FormTutor = props => (
    <div className="formTutor">
    <Form.Group widths='equal'>
    <input type="hidden" name={'user_' + props.number} id={'user_' + props.number} value='0'/>
    <input type="hidden" name={'user_type_' + props.number} id={'user_type_' + props.number} value='0'/>
    <Form.Field >
    <label>Usuario</label>
    <Select label='Usuario' options={users} onChange={(e, value) => set_usuario(e,  value)} placeholder='Usuario' id={props.number} />
    </Form.Field>
    <Form.Field>
    <label>Tipo de usuario</label>
    <Select onChange={(e, value) => set_tipo_usuario(e,  value)} fluid label='Tipo de usuario' id={props.number} options={roles} placeholder='Tipo de usuario'  />
    </Form.Field>
    </Form.Group>
    </div>
    )
    
    class LoadProjectAdmin extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                tutors: [<FormTutor number={0} />],
                count: 1
            }
            this.tutorsNumber = 0;
        }
        
        onAddTutor = () => {
            this.tutorsNumber += 1;
            this.setState(prevState => ({
                tutors: [...prevState.tutors, <FormTutor number={this.tutorsNumber} />],
                count: prevState.count+1
            }))
        }

        componentDidMount() {
            Http.get(`/admin/fetch_users_data`)
            .then(res => {
                for (var i = 0; i < res['data'].length; i++) {
                    var user = res['data'][i]
                    var name = user.name + ' ' + user.surname + ' - ' + user.email
                    users.push({ key: user.id, value: user.id, text: String(name) })
                }
                Http.get('/admin/fetch_roles').then(res => {
                    for (var i = 0; i < res['data'].length; i++) {
                        var rol = res['data'][i]
                        roles.push({ key: rol.id, value: rol.id, text: rol.name })
                    }
                })
            })



    }


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1 class="ui header">Crear proyecto</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form id="formProject" action='/admin/create_project' method='POST' enctype="multipart/form-data">
                                <input type="hidden" value={this.state.count} id='count_users' name='count_users'/>
                                <Form.Field>
                                    <label>Titulo</label>
                                    <input placeholder='Titulo' name='title' />
                                </Form.Field>
                                
                                <Form.Field>
                                    <label>Información directores, tutores y asesores</label>

                                </Form.Field>
                                {this.state.tutors}


                                <Form.Field>
                                    <Button onClick={this.onAddTutor} type='button'>Añadir</Button>
                                </Form.Field>
                                
                                <Form.Field>
                                    <Button type='submit'>Crear proyecto</Button>
                                </Form.Field>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <div>
            <LoadProject />
        </div>,
        document.body.appendChild(document.createElement('div')),
    )


})


export default LoadProjectAdmin
