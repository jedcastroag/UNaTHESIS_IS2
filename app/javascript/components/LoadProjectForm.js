import React from "react"
import PropTypes from "prop-types"

import { withRouter } from "react-router-dom";

import { 
  Button, Header, Form, Divider, Container, Input, Select, Dropdown
} from 'semantic-ui-react'

import { countriesOptions } from '../common/Countries';

import Http from '../services/RestServices'
import juryIcon from '../../assets/images/jury.png';
import directorIcon from '../../assets/images/director.png';
import tutorIcon from '../../assets/images/tutor.png';

class FormTutor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.options = [{ key: 'tutor', value: 'tutor', text: 'Tutor', image: { avatar: true, src: tutorIcon } }, 
    { key: 'director', value: 'director', text: 'Director', image: { avatar: true, src: directorIcon } },
    { key: 'jury', value: 'jury', text: 'Jurado', image: { avatar: true, src: juryIcon } }];
  }
  
  handleChange (e, { name, value }) {
    this.props.updateTutorData(this.props.number, name, value)
  }
  
  render() {
    return <React.Fragment>
      <Form.Group inline>

      <Form.Field required label="Nombres" placeholder='Nombres' control={ Input } 
      name='name' onChange={ this.handleChange } />
      <Form.Field required label='Apellidos' placeholder='Apellidos' control={ Input } 
      name='surname' onChange={ this.handleChange }/>
      <Form.Field required label='Email' placeholder='Email' control={ Input } 
      name='email' onChange={ this.handleChange } />
      <Form.Field required label='DNI' placeholder='DNI' control={ Input } 
      name='dni' onChange={ this.handleChange }/>
      </Form.Group>

      <Form.Group inline>
      <Form.Field required label='Institución' placeholder='Institución' control= { Input } 
      name={ 'institution' } onChange={ this.handleChange }/>
      
      <Form.Field required control={ Dropdown } search selection options={ countriesOptions } 
      name='country' placeholder='Country' label='Country' onChange={ this.handleChange }/>
      
      <Form.Field required label='Rol' control={ Select } placeholder='Rol en la tesis' 
      name='role' options={ this.options } onChange={ this.handleChange }/>
      </Form.Group>
      
      <Divider section />
      </React.Fragment>;
    }
  }
  
  FormTutor.defaultProps = {
    number: 0
  }
  
  class LoadFile extends React.Component {
    constructor(props) {
      super(props)
      
      this.tutorsNumber = 0;
      this.submitForm = this.submitForm.bind(this);
      this.updateTutorData = this.updateTutorData.bind(this);
      
      this.state = {
        tutors: [ <FormTutor number={0} key="form_tutor_0" updateTutorData={ this.updateTutorData }/> ],
        tutors_data: [ {} ]
      }
    }
    
    updateTutorData(index, key, value) {
      var data = this.state.tutors_data;
      data[index][key] = value;
      
      this.setState({
        tutors_data: data
      });
    }
    
    onAddTutor = () => {
      this.tutorsNumber += 1;
      
      this.setState(prevState => ({
        tutors: [ ...prevState.tutors, 
          <FormTutor updateTutorData={ this.updateTutorData } 
          number={ this.tutorsNumber } key={ "form_tutor_" + this.tutorsNumber }/> ],
          tutors_data: [ ...prevState.tutors_data, {} ]
        }))
      }
      
      submitForm(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        data.append("tutors_juries", JSON.stringify(this.state.tutors_data));
        
        //this.props.returnToHome()
        Http.post('/file/load_post', data).then(response => console.log(response))
        .catch( error => console.log("ERROR " + error));
      }
      
      render() {
        return (
          <Container>
          <Header as="h2">Cargar tesis</Header>
          
          <Form id="formProject" onSubmit={ this.submitForm }>
          <Form.Field required>
          <label>Titulo</label>
          <Input placeholder='Titulo' name='project_title' />
          </Form.Field>
          <Form.Field required>
          <label>Descripción</label>
          <textarea placeholder='Descripción' name="project_description" ></textarea>
          </Form.Field>
          
          <Header as="h5">Información directores, tutores y asesores</Header>
          
          {this.state.tutors}
          
          <Form.Field required>
          <Button onClick={this.onAddTutor} type='button'>Añadir</Button>
          </Form.Field>
          
          <Header as="h5">Documentos</Header>
          <Form.Field required>
          <label>Propuesta</label>
          <Input type='file' name="file" />
          </Form.Field>
          <Form.Field>
          <label>Documento de soporte</label>
          <Input type='file' name="supportFile" />
          </Form.Field>
          <Form.Field required>
          <label>Comentarios adicionales</label>
          <textarea placeholder='Comentarios adicionales' name="comments" ></textarea>
          </Form.Field>
          <Form.Field>
          <Button type='submit'>Cargar proyecto</Button>
          </Form.Field>
          </Form>
          </Container>
          );
        }
      }
      
      class LoadProjectForm extends React.Component {
        constructor(props) {
          super(props);
          this.returnToHome = this.returnToHome.bind(this);
        }
        
        returnToHome() {
          this.props.history.push("/")
        }
        
        render () {
          return <LoadFile returnToHome={ this.returnToHome }/>;
          }
        }
        
        export default withRouter(LoadProjectForm)
