import React from "react"
import PropTypes from "prop-types"
import { Table, Button } from 'semantic-ui-react'
import Http from '../services/RestServices'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';


const deleteProject = props => {
    Http.post(`/admin/delete_project`, {
        project_id: props.id

    }).then(res => {
        window.location.reload()
    })
}

const RowProject = props => (
    <Table.Row>
        <Table.Cell>{props.id}</Table.Cell>
        <Table.Cell>{props.title}</Table.Cell>
        <Table.Cell>{props.description}</Table.Cell>
        <Table.Cell selectable positive>
            <Link to={{ pathname: '/admin/projects/asign_roles', query: { id: props.id} }} >Asignar roles</Link>
        </Table.Cell>
        <Table.Cell selectable positive>
            <a onClick={() => deleteProject(props)}>Eliminar</a>
        </Table.Cell>
        
    </Table.Row>
)


class ProjectsAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                project_rows: []
            }
    }


    componentDidMount() {
        Http.get(`/admin/fetch_projects`)
            .then(res => {
                for (var i = 0; i < res['data'].length; i++) {
                    var project = res['data'][i]
                    this.setState(prevState => ({
                        project_rows: [...prevState.project_rows, <RowProject id={project.id} title={project.title} description={project.description} />]
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
                            <h1>Proyectos</h1>
                        </Col>
                        <Col>
                            <Button class="ui right floated button" href="/admin/users/add"><Link to="/admin/users/add">Añadir proyecto</Link></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Id</Table.HeaderCell>
                                    <Table.HeaderCell>Titulo</Table.HeaderCell>
                                    <Table.HeaderCell>Descripción</Table.HeaderCell>
                                    <Table.HeaderCell>Asignar roles</Table.HeaderCell>
                                    <Table.HeaderCell>Eliminar</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.project_rows}

                            </Table.Body>
                        </Table>

                    </Row>

                </Container>
            </div>
        );
    }
}


export default ProjectsAdmin
