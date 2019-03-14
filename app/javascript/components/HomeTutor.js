import React from "react"
import PropTypes from "prop-types"
import Http from '../services/RestServices'
import { withRouter } from 'react-router-dom'
import { Button, Input, Checkbox, Form, Grid, Segment, Container, Table, TableBody } from 'semantic-ui-react'
import '../../../dist/semantic.min.css'

class ProjectRow extends React.Component {

    componentDidMount(){
        let tableRows = []
        Http.get('tutor/projects')
        .then(response => {                         
            response.data.forEach(row => {
                Http.get(`users/${row[0].id_estudiante}`)
                .then(res => {                    
                    tableRows.push({studentName: res.data.name, studentEmail: res.data.email, projectTitle: row[0].title, studentId: row[0].id_estudiante, thesis_state: row[0].approbation_state})                                        
                    this.setState({
                        projects: tableRows
                    })
                })                                
            })                                                                
        })           
    }

    constructor(props) {
        super(props)        
        
        this.state = {            
            projects: [],                   
        }  
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(project) {                
        this.props.redirectToProject(project.studentId)
    }

    render(){        
        const projects = this.state.projects             
        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre Estudiante</Table.HeaderCell>
                        <Table.HeaderCell>Correo Estudiante</Table.HeaderCell>
                        <Table.HeaderCell>Titulo Proyecto</Table.HeaderCell>
                        <Table.HeaderCell>Estado</Table.HeaderCell>
                        <Table.HeaderCell>Ver Tesis</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>      

                <TableBody>                    
                    {projects.map(project => <Table.Row key = {project.studentId} >
                        <Table.Cell
                            children = {project.studentName}>
                        </Table.Cell>
                        <Table.Cell
                            children = {project.studentEmail}>
                        </Table.Cell>
                        <Table.Cell
                            children = {project.projectTitle}>
                        </Table.Cell>
                        <Table.Cell
                            children = {project.thesis_state === true ? "Aprobado" : "Desaprobado"}>
                        </Table.Cell>
                        <Table.Cell collapsing>
                            <Button onClick ={this.handleClick.bind(this,project)}>Ver Tesis</Button>                            
                        </Table.Cell>
                    </Table.Row>)}
                </TableBody>      
            </Table>

            
            
        )
    }       

}

class TutorHomeView extends React.Component {
    constructor(props) {        
        super(props)        
    }

    redirectToProject = (id) => {
        this.props.redirectToProject(id)
    }

    render () {                        
        return (
            <div>
                <div className="ui raised container segment"> 
                    <h3>Proyectos actuales</h3>
                    
                    <ProjectRow redirectToProject={this.redirectToProject}/>                    
                </div>
            </div>
        )
    }
}

class HomeTutor extends React.Component { 
      
    redirectToProject = (id) => {
        const path = '/load/' + id         
        this.props.history.push(path)                  
    }
    
    render () {
        return (
            <div>
            <TutorHomeView redirectToProject={this.redirectToProject}/>
            </div>
        )
    }
}

HomeTutor.propTypes = {
    greeting: PropTypes.string
  };
  
  export default withRouter(HomeTutor)
