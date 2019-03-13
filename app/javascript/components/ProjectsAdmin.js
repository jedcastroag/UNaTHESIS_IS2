import React from "react"
import PropTypes from "prop-types"
import { Table, Button, Segment, Header, Grid, Divider } from 'semantic-ui-react'
import Http from '../services/RestServices'
import { Container } from 'react-grid-system';
import { withRouter } from "react-router-dom";

const deleteProject = props => {
    Http.post(`/admin/delete_project`, {
        project_id: props.id

    }).then(res => {
        window.location.reload()
    })
}

const deactivateProject = props => {
    Http.post(`/admin/deactivate_project`, {
        project_id: props.id

    }).then(res => {
        window.location.reload()
    })
}

const activateProject = props => {
    Http.post(`/admin/activate_project`, {
        project_id: props.id

    }).then(res => {
        window.location.reload()
    })
}

class RowProject extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <Table.Row>
            <Table.Cell>{this.props.id}</Table.Cell>
            <Table.Cell>{this.props.title}</Table.Cell>
            <Table.Cell>{this.props.activation_state ? 'Activado' : 'Desactivado'}</Table.Cell>
            <Table.Cell className="centered" selectable positive>
                <a href="javascript:void(0);" onClick={() => this.props.asignRolesRedirect(this.props.id)}>Editar</a>
                </Table.Cell>
            {this.props.activation_state ? <Table.Cell selectable negative>
                <a href="javascript:void(0);" onClick={() => deactivateProject(this.props)}>Desactivar proyecto</a>
            </Table.Cell> : <Table.Cell selectable positive>
                    <a href="javascript:void(0);" onClick={() => activateProject(this.props)}>Activar proyecto</a>
                </Table.Cell>}
            
            <Table.Cell selectable negative>
                <a href="javascript:void(0);" onClick={() => deleteProject(this.props)}>Eliminar</a>
            </Table.Cell>

        </Table.Row>

    };

}

class ProjectsAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                project_rows: []
            }
        this.asignRolesRedirect = this.asignRolesRedirect.bind(this)
        this.createProjectRedirect = this.createProjectRedirect.bind(this)
    }

    asignRolesRedirect(id) {
        this.props.history.push({
            pathname: '/admin/projects/asign_roles',
            query: { id: id }
        });
    }

    componentDidMount() {
        Http.get(`/admin/fetch_projects`)
            .then(res => {
                for (var i = 0; i < res['data'].length; i++) {
                    var project = res['data'][i]
                    this.setState(prevState => ({
                        project_rows: [...prevState.project_rows, <RowProject asignRolesRedirect={this.asignRolesRedirect} id={project.id} title={project.title} activation_state={project.activation_state} />]
                    }))
                }
            })

    }
    reload = () => {
        this.componentDidMount();
    };

    createProjectRedirect() {
        this.props.history.push({
            pathname: '/admin/projects/create'
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <Segment>
                        <Header>
                            <Grid>
                                <Grid.Column width={14}><h1>Proyectos</h1></Grid.Column>
                                <Grid.Column width={2}>
                                    <Button right floated button onClick onClick={this.createProjectRedirect}>Crear Proyecto</Button>
                                </Grid.Column>
                            </Grid>
                        </Header>
                        <Divider section />

                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Id</Table.HeaderCell>
                                    <Table.HeaderCell>Titulo</Table.HeaderCell>
                                    <Table.HeaderCell>Estado de activación</Table.HeaderCell>
                                    <Table.HeaderCell>Asignar roles</Table.HeaderCell>
                                    <Table.HeaderCell>Desactivar</Table.HeaderCell>
                                    <Table.HeaderCell>Eliminar</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.project_rows}

                            </Table.Body>
                        </Table>

                    </Segment>

                </Container>
            </div>
        );
    }
}


export default withRouter(ProjectsAdmin)
