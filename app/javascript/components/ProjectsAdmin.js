import React from "react"
import PropTypes from "prop-types"
import { Table, Button } from 'semantic-ui-react'
import Http from '../services/RestServices'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';

const deleteUser = props => {
    Http.post(`/admin/delete_user`, {
        user_id: props.id

    }).then(res => {
        window.location.reload()
    })
}


const RowUser = props => (
    <Table.Row>
        <Table.Cell>{props.name}</Table.Cell>
        <Table.Cell>{props.surname}</Table.Cell>
        <Table.Cell>{props.email}</Table.Cell>

        <Table.Cell selectable positive>
            <a onClick={() => deleteUser(props)}>Eliminar</a>
        </Table.Cell>
    </Table.Row>
)


class ProjectsAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                user_rows: []
            }
    }


    componentDidMount() {
        Http.get(`/admin/fetch_users_data`)
            .then(res => {
                for (var i = 0; i < res['data'].length; i++) {
                    var user = res['data'][i]
                    this.setState(prevState => ({
                        user_rows: [...prevState.user_rows, <RowUser name={user.name} surname={user.surname} email={user.email} id={user.id} />]
                    }))
                }
            })

    }


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>Usuarios</h1>
                        </Col>
                        <Col>
                            <Button class="ui right floated button" href="/admin/users/add"><Link to="/admin/users/add">Añadir usuario</Link></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nombres</Table.HeaderCell>
                                    <Table.HeaderCell>Apellidos</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Asignar roles</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.user_rows}

                            </Table.Body>
                        </Table>

                    </Row>

                </Container>
            </div>
        );
    }
}


export default ProjectsAdmin
