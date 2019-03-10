import React from "react"
import PropTypes from "prop-types"
import { Table, Button, Dropdown, Form, Segment, Header, Divider } from 'semantic-ui-react'
import Http from '../services/RestServices'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';
import UsersAdmin from "./UsersAdmin";

const users = []
const roles = []

const FormRol = props => (

    <div className="formTutor">
        <Divider section />

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Usuario</label>
                <select class="ui selection dropdown" name={'user_' + props.number} placeholder='Usuario'>
                    {users.map((value, index) => {
                        if (value.value == props.user_id) {
                            return <option value={value.value} selected>{value.text}</option>
                        }
                        return <option value={value.value}>{value.text}</option>
                    })}
                </select>
            </Form.Field>

            <Form.Field required>
                <label>Roles</label>
                <select class="ui selection dropdown" name={'rol_' + props.number} placeholder='Roles'>
                    {roles.map((value, index) => {
                        if (value.value == props.rol_id) {
                            return <option value={value.value} selected>{value.text}</option>

                        }
                        return <option value={value.value}>{value.text}</option>
                    })}
                </select>
            </Form.Field>
        </Form.Group>
    </div>
);

class ProjectsAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project_id: props.location.query.id,
            user_roles: [],
            tutors_number: 0,
            title: ''
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
                    Http.get('/admin/fetch_project_data', { params: { id: this.state.project_id } }).then(res => {
                        this.setState(prevState => ({
                            title: res['data'].title
                        }))

                        Http.get('/admin/fetch_roles_project', { params: { id: this.state.project_id } }).then(res => {
                            for (var i = 0; i < res['data'].length; i++) {
                                var user = res['data'][i]
                                this.setState(prevState => ({
                                    user_roles: [...prevState.user_roles, <FormRol user_id={user.user_id} rol_id={user.thesis_project_roles_id} number={this.countTutors} />],
                                    tutors_number: prevState.tutors_number + 1
                                }), () => {
                                    this.countTutors += 1
                                });
                            }
                        })
                    })
                })



            })



    }
    onAddTutor = () => {
        this.setState(prevState => ({
            user_roles: [...prevState.user_roles, <FormRol number={this.countTutors} />],
            tutors_number: prevState.tutors_number + 1
        }), () => {
            this.countTutors += 1
        });
    }
    submitForm(event) {
        event.preventDefault();

        const data = new FormData(event.target);


        Http.post('/admin/asign_roles', data).then(() => window.location.href = '/admin/projects')
            .catch(error => console.log("ERROR " + error));
    }

    onChangeHandle(type, value) {
        console.log(value)
        switch (type) {
            case 'title':
                this.setState(() => ({
                    title: value
                }))
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Segment>
                        <Header as="h2">Editar proyecto</Header>
                        <Divider section />

                        <Form onSubmit={this.submitForm}>
                            <input type="hidden" name="id_project" value={this.state.project_id}></input>
                            <input type="hidden" name="count_users" value={this.state.tutors_number}></input>
                            <Form.Field required>
                                <label>Titulo</label>
                                <input type="text" placeholder='Titulo' name='title' value={this.state.title} onChange={(e, value) => this.onChangeHandle('title', value)} ></input>
                            </Form.Field>

                            <Form.Field>
                                <label>Información directores, tutores y asesores</label>

                                <Row>
                                    <Col>
                                        {this.state.user_roles}
                                        <Form.Field>
                                            <Button onClick={this.onAddTutor} type='button'>Añadir</Button>
                                            <Button type='submit'>Enviar</Button>
                                        </Form.Field>
                                    </Col>
                                </Row>
                            </Form.Field>
                        </Form>
                    </Segment>

                </Container>
            </div>
        );
    }
}


export default ProjectsAdmin
