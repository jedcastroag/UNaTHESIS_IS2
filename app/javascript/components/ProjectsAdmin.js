import React from "react"
import PropTypes from "prop-types"
import { Table, Button } from 'semantic-ui-react'
import Http from '../services/RestServices'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';
import { withRouter } from "react-router-dom";


const deleteProject = props => {
    Http.post(`/admin/delete_project`, {
        project_id: props.id

    }).then(res => {
        window.location.reload()
    })
}


    

class RowProject extends React.Component {
    constructor(props) {
        super(props)
        
    }
    render(){
           return <Table.Row>
               <Table.Cell>{this.props.id}</Table.Cell>
               <Table.Cell>{this.props.title}</Table.Cell>
               <Table.Cell>{this.props.description}</Table.Cell>
               <Table.Cell className="centered" selectable positive onClick={() => this.props.asignRolesRedirect(this.props.id)}>
                Asignar Roles
                </Table.Cell>
            <Table.Cell selectable positive>
                   <a onClick={() => deleteProject(this.props)}>Eliminar</a>
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
    }

    asignRolesRedirect(id){
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
                        project_rows: [...prevState.project_rows, <RowProject asignRolesRedirect={this.asignRolesRedirect} id={project.id} title={project.title} description={project.description} />]
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
                            <Link to="/admin/projects/create">Crear proyecto</Link>
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


export default withRouter(ProjectsAdmin)
