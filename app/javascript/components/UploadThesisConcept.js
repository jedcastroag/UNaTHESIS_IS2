import React from "react"
import PropTypes from "prop-types"
import Http from '../services/RestServices'

import {withRouter} from 'react-router-dom'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

class CheckThesis extends React.Component {
    componentDidMount() {                     
        Http.get(`/users/${this.state.studentId}`)        
        .then(res => {            
            this.setState({
                nombres: res.data.name,
                apellidos: res.data.surname,
                correo: res.data.email,                    
            })            
        })
        Http.get(`/project/find/${this.state.studentId}`)
        .then(res => {                  
            Http.get(`/tutor/download/${res.data[0].thesis_project_id}`, { responseType: 'blob' })
            .then(response => {                
                this.setState({ projectUrl: URL.createObjectURL(response.data) });
            })                  
            this.setState({                
                titulo: res.data[0].title,
                descripcion: res.data[0].description,
                projectId: res.data[0].thesis_project_id,
                thesis_state: res.data[0].approbation_state
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
            descripcion: '',
            projectUrl: null,
            projectId: 0,     
            thesis_state: false
        }       
        this.savePdf = this.savePdf.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    savePdf(){
        var url = this.state.projectUrl;

        var anchorElem = document.createElement("a")
        anchorElem.style = "display: none"
        anchorElem.href = url
        anchorElem.download = this.state.titulo

        document.body.appendChild(anchorElem)
        anchorElem.click()

        document.body.removeChild(anchorElem)
    }

    submitForm(event){                
        event.preventDefault()
        const data = new FormData(event.target)
        data.append('projectId', this.state.projectId)
        data.append('student_name', this.state.nombres)
        data.append('student_email', this.state.correo)
        data.append('project_title', this.state.titulo)
        Http.post('/tutor/upload_concept', data).then().catch(error => 
        console.log('ERROR' + error))            
        this.props.redirectToHome()            
    }

    render () {                 
      return (                   
        <div>
        <div className="ui raised container segment">           
        <h2 className="ui center aligned header" style={{display: this.state.thesis_state ? 'none' : 'block'}}>Subir Concepto</h2>

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
        <Grid container columns = {2} stackable>
            <Grid.Column>
                <label>Documento tesis</label>
                <Segment>                    
                    <Button onClick={ this.savePdf } name="download" placeholder ="Descargar">Descargar</Button>                     
                    <p>Presiona para descargar el documento correspondiente al proyecto</p>                    
                </Segment>
            </Grid.Column>   
        </Grid>

        <Form id= "conceptForm" onSubmit={ this.submitForm } style={{display: this.state.thesis_state ? 'none' : 'block'}}>

        <Grid container columns = {2} stackable>
            <Grid.Column>                
                <Form.Field>
                    <label>Comentarios adicionales</label>
                    <textarea placeholder="Comentarios adicionales" name = "comentarios"></textarea>
                </Form.Field>                
            </Grid.Column>
            <Grid.Column>                
                <Form.Field>
                    <label>Aprobación</label>
                    <select className = "ui fluid dropdown" name = "estado">
                        <option value="approved">Aprobado</option>
                        <option value="disapproved">No Aprobado</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Revision</label>
                    <input type='file' name="file" />
                </Form.Field>                 
                <Form.Field>                    
                    <Button floated="right" type="submit" name ="submitButton" style={{display: this.state.thesis_state ? 'none' : 'block'}}>Subir Revision</Button>
                </Form.Field>
            </Grid.Column>            
        </Grid>                      
        </Form>
        <Grid container columns = {1} stackable>
            <Grid.Column>                                                
                <Button floated="right" onClick={this.props.redirectToHome}  name = "cancel">Cancelar</Button>                                                 
            </Grid.Column>   
        </Grid>        
        </div>
        </div>
    );
  }
}

class UpdloadThesisConcept extends React.Component {
    redirectToHome(){
        this.props.history.push('/')        
    }
    render () {        
        return <CheckThesis id = {this.props.match.params.id} 
        redirectToHome={() => this.redirectToHome()}/>;
    }    
}

UpdloadThesisConcept.propTypes = {
    greeting: PropTypes.string
};
  
export default withRouter(UpdloadThesisConcept)
