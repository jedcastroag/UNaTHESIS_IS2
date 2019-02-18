import React from "react"
import PropTypes from "prop-types"
import Http from '../services/restservices'

import { Button, Input, Checkbox, Form, Grid, Segment, Container } from 'semantic-ui-react'
import '../../../dist/semantic.min.css';
import { fromByteArray } from "ipaddr.js";


class CheckThesis extends React.Component {
    

    componentDidMount() {                     
        Http.get(`/users/${this.state.studentId}`)        
        .then(res => {            
            this.setState({
                nombres: res.data.name,
                apellidos: res.data.surname,
                correo: res.data.email     
            })            
        })
        Http.get(`/project/find/${this.state.id}`)
        .then(res => {            
            this.setState({                
                titulo: res.data.title,
                descripcion: res.data.description
            })
        })
    }

    constructor(props) {                
        super(props)
        this.state = {
            nombres: '',
            apellidos: '',
            correo: '',
            studentId: this.props.id,
            titulo: '',
            descripcion: ''
        }
    }

    render () {            
      return (                   
        <div>
        <div className="ui raised container segment">           
        <h2 className="ui center aligned header">Subir Concepto</h2>

        <h3 className="ui header">Información Estudiante</h3>        
        <Grid container columns ={3} stackable>
            <Grid.Column>                
                <label>DNI</label>                
                <Segment>
                    <p>{this.state.studentId}</p>                    
                </Segment>   
            </Grid.Column>
            <Grid.Column>
                <label>Nombres</label>                
                <Segment>                    
                    <p > {this.state.nombres} </p>                    
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <label>Apellidos</label>  
                <Segment>
                    <p> {this.state.apellidos} </p>    
                </Segment>              
            </Grid.Column>
        </Grid>

        <Grid container columns ={2} stackable>
            <Grid.Column>
                <label>Correo</label>
                <Segment>
                    <p> {this.state.correo} </p>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <label>Perfil</label>
                <Segment>
                    <p>Perfíl</p>
                </Segment>
            </Grid.Column>
        </Grid>
        <h3 className="ui header">Información Proyecto</h3>     
        <Grid container columns = {1} stackable>
            <Grid.Column>
                <label>Título</label>     
                <Segment>
                    <p>{this.state.titulo}</p>
                </Segment>
            </Grid.Column>   
        </Grid>

        <Grid container columns = {1} stackable>
            <Grid.Column>
                <label>Descripción</label>     
                <Segment>
                    <p>{this.state.descripcion}</p>
                </Segment>
            </Grid.Column>   
        </Grid>
        
        <Form id= "conceptForm">

        <Grid container columns = {2} stackable>
            <Grid.Column>                
                <Form.Field>
                    <label>Comentarios adicionales</label>
                    <textarea placeholder="Comentarios adicionales"></textarea>
                </Form.Field>                
            </Grid.Column>
            <Grid.Column>
                <label>Documento tesis</label>
                <Segment>Mostrar Documento</Segment>
                <Form.Field>
                    <label>Revision</label>
                    <input type='file' name="file" />
                </Form.Field> 
                <Form.Field>
                    <Button floated="right" type="submit">Subir Revision</Button>
                </Form.Field>       
            </Grid.Column>
        </Grid>

        </Form>
        </div>
        </div>
    );
  }
}

class UpdloadThesisConcept extends React.Component {
    render () {
        return (
            <div>            
            <CheckThesis id = {this.props.match.params.id}/>            
            </div>
        )
    }
}

UpdloadThesisConcept.propTypes = {
    greeting: PropTypes.string
  };
  
  export default UpdloadThesisConcept