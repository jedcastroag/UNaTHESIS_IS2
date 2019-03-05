import React from "react"
import PropTypes from "prop-types"
import { Table, Button, Dropdown, Form } from 'semantic-ui-react'
import Http from '../services/RestServices'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';
import UsersAdmin from "./UsersAdmin";

const users = []
const roles = []

const FormRol = props => (

    <div className="formTutor">
        <Form.Group widths='equal'>
            <Form.Field>
                <label>Usuario</label>
                <select class="ui selection dropdown" name={'user_' + props.number} value={props.user_id} placeholder='Usuario'>
                    {users.map((value, index) => {
                        return <option value={value.value}>{value.text}</option>
                    })}
                </select>
            </Form.Field>

            <Form.Field>
                <label>Roles</label>
                <select class="ui selection dropdown" name={'rol_' + props.number} value={props.rol_id} placeholder='Roles'>
                    {roles.map((value, index) => {
                        return <option value={value.value}>{value.text}</option>
                    })}
                </select>
            </Form.Field>
        </Form.Group>
        <hr></hr>
    </div>
)




class ProjectsAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                project_id: props.location.query.id,
                user_roles: [],
                tutors_number: 0
            }
            this.countTutors = 0;
    }


    componentDidMount() {

        Http.get(`/admin/fetch_users_data`)
            .then(res => {

                for (var i = 0; i < res['data'].length; i++) {
                    var user = res['data'][i]
                    var name = user.name + ' ' + user.surname
                    users.push({ key: user.id, value: user.id, text: String(name) })


                }
                Http.get('/admin/fetch_roles').then(res => {
                    for (var i = 0; i < res['data'].length; i++) {
                        var rol = res['data'][i]
                        roles.push({ key: rol.id, value: rol.id, text: rol.name })
                    }

                    Http.get('/admin/fetch_roles_project', { params: { id: this.state.project_id } }).then(res => {
                        for (var i = 0; i < res['data'].length; i++) {
                            var user = res['data'][i]
                            this.setState(prevState => ({
                                user_roles: [...prevState.user_roles, <FormRol user_id={user.id} rol_id={user.rol_id} number={this.countTutors} />],
                                tutors_number: prevState.tutors_number + 1
                            }), () => {
                                this.countTutors += 1
                            });
                        }
                    })

                })



            })



    }
    onAddTutor = () => {
        this.setState(prevState => ({
            user_roles: [...prevState.user_roles, <FormRol  number={this.countTutors} />],
            tutors_number: prevState.tutors_number + 1
        }), () => {
            this.countTutors += 1
        });
    }

    render() {
        return (
            <div>
                <h2>a</h2>
                <Container>
                    <Row>
                        <Col>
                            <h1>Roles</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form action='/admin/asign_roles' method='POST'>
                                <input type="hidden" name="id_project" value={this.state.project_id}></input>
                                <input type="hidden" name="count_users" value={this.state.tutors_number}></input>
                                <Row>
                                    <Col>
                                        {this.state.user_roles}
                                        <Form.Field>
                                            <Button onClick={this.onAddTutor} type='button'>Añadir</Button>
                                            <Button type='submit'>Enviar</Button>
                                        </Form.Field>
                                    </Col>
                                </Row>

                            </Form>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}


export default ProjectsAdmin
