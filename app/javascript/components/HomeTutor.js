import React from "react"
import PropTypes from "prop-types"

import { Redirect, BrowserRouter } from 'react-router-dom'
import { Button, Input, Checkbox, Form, Grid, Segment, Container, Header } from 'semantic-ui-react'

class ProjectRow extends React.Component {
    state = {
        redirect:false,
    }
    
    handleClick() {
        this.setState(() => ({
            redirect: true
        }))
    }
    
    render() {
        const { redirect } = this.state
        if(redirect){            
            return <Redirect to='/load/2'/>;            
        }
        return (
            <Grid container row>
            <Grid container columns={ 4 } stackable>
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
            <Button onClick ={ this.handleClick.bind(this) }>Ver proyecto</Button>
            </Grid.Column>
            </Grid>
            </Grid>
            )
        }
    }
    
    class TutorInfo extends React.Component {        
        constructor(props) {        
            super(props);
        }
        
        render() {
            return ( 
                <div>
                <Header as="h3">Tu Información Personal</Header>
                <Grid container columns ={3} stackable>
                <Grid.Column>                
                <label>Nombre</label>                
                <Segment>
                <p>{ this.props.data.name }</p>
                </Segment>   
                </Grid.Column>
                <Grid.Column>
                <label>Apellidos</label>                
                <Segment>
                <p >{ this.props.data.surname }</p>
                </Segment>
                </Grid.Column>
                <Grid.Column>
                <label>Correo</label>  
                <Segment>
                <p>{ this.props.data.email }</p>    
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
                    rows: <ProjectRow />
                }
            }
            
            render () {                
                return (
                    <Container>
                    <Segment raised compact> 
                    <Header as='h2' textAlign='center'>Bienvenido { this.state.nombre }</Header>
                    <TutorInfo data={ this.props.data }/>
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
                    { this.state.rows } 
                    </Grid>                   
                    </Segment>
                    </Container>
                    )
                }
            }
            
            class HomeTutor extends React.Component {
                constructor(props) {
                    super(props);
                }
                render () {
                    return <TutorHomeView data={ this.props.data }/>;
                }
            }
            
            export default HomeTutor
