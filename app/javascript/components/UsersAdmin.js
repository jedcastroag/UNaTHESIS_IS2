import React from "react"
import PropTypes from "prop-types"

import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';

import Http from '../services/RestServices'
import { withRouter } from "react-router-dom";

const deleteUser = props => {
    Http.post('/admin/delete_user', {
        user_id: props.id
    }).then(res => {
        window.location.reload()
    })
}

class RowUser extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return <Table.Row>
            <Table.Cell>{this.props.name}</Table.Cell>
            <Table.Cell>{this.props.surname}</Table.Cell>
            <Table.Cell>{this.props.email}</Table.Cell>
            <Table.Cell  selectable positive onClick={() => this.props.editUserRedirect(this.props.id)}>
                <p>Editar usuario</p>
                </Table.Cell>
            <Table.Cell selectable positive>
                <a onClick={() => deleteUser(this.props)}>Eliminar</a>
            </Table.Cell>
        </Table.Row>
    }
}


class UsersAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_rows: []
        }
        this.editUserRedirect = this.editUserRedirect.bind(this)

    } 
    
    editUserRedirect(id) {
        this.props.history.push({
            pathname: '/admin/users/edit',
            query: { user_id: id }
        });
    }

    componentDidMount() {
        Http.get(`/admin/fetch_users_data`)
            .then(res => {
                for (var i = 0; i < res['data'].length; i++) {
                    var user = res['data'][i]
                    this.setState(prevState => ({
                        user_rows: [...prevState.user_rows, <RowUser editUserRedirect={this.editUserRedirect} name={user.name} surname={user.surname} email={user.email} id={user.id} />]
                    }))
                }
            })
    }

    render() {
        return <Container>
            <Row>
                <Col>
                    <h1>Usuarios</h1>
                </Col>
                <Col>
                    <Button right floated button><Link to="/admin/users/add">Añadir usuario</Link></Button>
                </Col>
            </Row>
            <Row>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nombres</Table.HeaderCell>
                            <Table.HeaderCell>Apellidos</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Editar</Table.HeaderCell>
                            <Table.HeaderCell>Eliminar</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {this.state.user_rows}

                    </Table.Body>
                </Table>

            </Row>

        </Container>;
    }
}

export default withRouter(UsersAdmin)
