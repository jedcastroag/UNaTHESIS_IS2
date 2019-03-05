import React from "react"
import PropTypes from "prop-types"
import { Table, Button, Dropdown, Form } from 'semantic-ui-react'
import Http from '../services/RestServices'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';
import UsersAdmin from "./UsersAdmin";

const users = []

const FormRol = props => (
    <div className="formTutor">
    <Form.Group widths='equal'>
    <Form.Select label='Usuario' name={'user_' + props.number} options={users} value={props.user_id} placeholder='Usuario'/>
    <Form.Select fluid label='Tipo de usuario' name={'user_type_' + props.number} options={
        [
            {key:0, value:0, text:'Director'},
            {key:1, value:1, text:'Tutor'},
            {key:2, value:2, text:'Asesor'}
        ]
    } placeholder='Tipo de usuario' defaultValue={props.user_type}/>
    </Form.Group>
    </div>
    );
    
    class ProjectsAdmin extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                project_id: props.location.query.id,
                user_roles: []
            }
        }
        
        componentDidMount() {    
            Http.get(`/admin/fetch_users_data`)
            .then(res => {
                for (var i = 0; i < res['data'].length; i++) {
                    var user = res['data'][i];
                    var name = user.name + ' ' + user.surname;
                    users.push( {key: user.id, value: user.id, text: String(name)});
                }

                Http.get('/admin/get_roles_project', { params: {id: this.state.project_id}}).then(res => {
                    for (var i = 0; i < res['data'].length; i++) {
                        var user = res['data'][i]
                        this.setState(prevState => ({
                            user_roles: [...prevState.user_roles, <FormRol user_type={user.rol_id} rol_id={user.rol_id} />]
                        }))
                    }
                })
            })
        }
        
        render() {
            return <Container>
                <Row>
                <Form>
                
                { this.state.user_roles }

                </Form>
                </Row>
                
                </Container>;
            }
        }
        
        
        export default ProjectsAdmin
        