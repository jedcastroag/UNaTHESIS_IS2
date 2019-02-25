import React from "react"
import PropTypes from "prop-types"
import Http from '../services/RestServices'
import { Redirect, BrowserRouter } from 'react-router-dom'
import { Button, Input, Checkbox, Form, Grid, Segment, Container, Table, TableBody } from 'semantic-ui-react'
import '../../../dist/semantic.min.css'

class ProjectRow extends React.Component {

    componentDidMount(){
        let tableRows = []
        Http.get('tutor/projects')
        .then(response => {                                                       
            response.data.forEach(row => {
                Http.get(`users/${row.id_estudiante}`)
                .then(res => {                    
                    tableRows.push({studentName: res.data.name, studentEmail: res.data.email, projectTitle: row.title, studentId: row.id_estudiante})                                        
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
            redirect: false,
            projects: [],
            idStudent: null            
        }  
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(project) {        
        this.setState(() => ({
            redirect: true,
            idStudent: project.studentId
        }))
    }

    render(){
        const redirect = this.state.redirect
        const projects = this.state.projects
        
        if(redirect){                        
            const path = '/load/' + this.state.idStudent   
            return <Redirect to={path}/>;            
        }        
        
        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre Estudiante</Table.HeaderCell>
                        <Table.HeaderCell>Correo Estudiante</Table.HeaderCell>
                        <Table.HeaderCell>Titulo Proyecto</Table.HeaderCell>
                        <Table.HeaderCell>Ver Tesis</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>      

                <TableBody>                    
                    {projects.map(project => <Table.Row key = {project.id} >
                        <Table.Cell
                            children = {project.studentName}>
                        </Table.Cell>
                        <Table.Cell
                            children = {project.studentEmail}>
                        </Table.Cell>
                        <Table.Cell
                            children = {project.projectTitle}>
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

class TutorInfo extends React.Component {
    componentDidMount() {  
        Http.get('/getUserInfo')        
        .then(res => {
            this.setState({
                nombres: res.data.name,
                apellidos: res.data.surname,
                correo: res.data.email
            })            
        })
    }

    constructor(props) {        
        super(props)
        this.state = {
            nombres: '',
            apellidos: '',
            correo: ''
        }            
    }

    render() {
        return (
            <div>
            <h3 className="ui header">Tu Información Personal</h3>
            <Grid container columns ={3} stackable>
                <Grid.Column>                
                    <label>Nombre</label>                
                    <Segment>
                        <p>{this.state.nombres}</p>
                    </Segment>   
                </Grid.Column>
                <Grid.Column>
                    <label>Apellidos</label>                
                    <Segment>
                        <p >{this.state.apellidos}</p>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <label>Correo</label>  
                    <Segment>
                        <p>{this.state.correo}</p>    
                    </Segment>              
                </Grid.Column>
            </Grid>
            </div>
        )
    }
    
}

class TutorHomeView extends React.Component {
    constructor(props) {        
        super(props)
    }

    render () {                
        return (
            <div>
                <div className="ui raised container segment"> 
                    <h2 className="ui center aligned header">Bienvenido</h2>
                    <TutorInfo />
                    <h3>Proyectos actuales</h3>

                    <ProjectRow />                    
                </div>
            </div>
        )
    }
}

class HomeTutor extends React.Component {
    render () {
        return (
            <div>
            <TutorHomeView />
            </div>
        )
    }
}

HomeTutor.propTypes = {
    greeting: PropTypes.string
  };
  
  export default HomeTutor