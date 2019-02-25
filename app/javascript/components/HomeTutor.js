import React from "react"
import PropTypes from "prop-types"
import Http from '../services/RestServices'
import { Redirect, BrowserRouter } from 'react-router-dom'
import { Button, Input, Checkbox, Form, Grid, Segment, Container } from 'semantic-ui-react'
import '../../../dist/semantic.min.css'

class ProjectRow extends React.Component {
    state = {
        redirect:false,
    }

    handleClick(){
        this.setState(() => ({
            redirect: true
        }))
    }

    render(){
        const {redirect} = this.state
        if(redirect){            
            return <Redirect to='/load/2'/>;            
        }
        return (
        <Grid container row>
            <Grid container columns ={4} stackable>
                <Grid.Column>
                    <p>Juan Diego Moreno Mora</p>
                </Grid.Column>
                <Grid.Column>
                    <p>judmorenomo@unal.edu.co</p>
                </Grid.Column>
                <Grid.Column>
                    <p>Hola</p>
                </Grid.Column>
                <Grid.Column>
                    <Button onClick ={this.handleClick.bind(this)}>See Project</Button>
                </Grid.Column>
            </Grid>
        </Grid>
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
        this.state = {
            nombre: 'Tutor1',
            estu: 'Estdiante Testercito',            
            cor: 'student@test.com',
            nombrePro: 'Tesis 100% real',
            rows: <ProjectRow/>
        }
    }

    render () {                
        return (
            <div>
                <div className="ui raised container segment"> 
                    <h2 className="ui center aligned header">Bienvenido {this.state.nombre}</h2>
                    <TutorInfo />
                    <h3>Proyectos actuales</h3>
                    <Grid container columns = {4} stackable>
                        <Grid.Column>
                            <h4>Nombre Estudiante</h4>
                        </Grid.Column>
                        <Grid.Column>
                            <h4>Correo</h4>
                        </Grid.Column>
                        <Grid.Column>
                            <h4>Nombre Proyecto</h4>
                        </Grid.Column>                        
                    </Grid>

                    <Grid container row>
                        {this.state.rows} 
                    </Grid>                   
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