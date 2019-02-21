import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from 'react-grid-system';

import { Button, Input, Checkbox, Form } from 'semantic-ui-react'

import Http from '../services/RestServices'

const FormTutor = props => (
  <div className="formTutor">
  <Form.Group inline>
  <Form.Field>
  <label>Dni</label>
  <input placeholder='DNI' name={ 'dni_' + props.number } />
  </Form.Field>
  <Form.Field>
  <label>Nombres</label>
  <input placeholder='Nombres' name={ 'name_' + props.number } />
  </Form.Field>
  <Form.Field>
  <label>Apellidos</label>
  <input placeholder='Apellidos' name={ 'surname_' + props.number } />
  </Form.Field>
  </Form.Group>
  <Form.Group inline>
  <Form.Field>
  <label>Institución</label>
  <input placeholder='Institución' name={ 'institution_' + props.number } />
  </Form.Field>
  <Form.Field>
  <label>País</label>
  <input placeholder='País' name={ 'country_' + props.number } />
  </Form.Field>
  <Form.Field>
  <label>Rol</label>
  <select name={ 'role_' + props.number }>
  <option>Director</option>
  <option>Tutor</option>
  <option>Asesor</option>
  </select>
  </Form.Field>
  </Form.Group>
  </div>
  )

class LoadFile extends React.Component {
  constructor(props) {
    super(props)
    this.state =
    {
      tutors: [<FormTutor number={0} />]
    }
    this.tutorsNumber = 0;
  }

  onAddTutor = () => {
    this.tutorsNumber += 1;
    console.log(this.state);
    this.setState(prevState => ({
      tutors: [...prevState.tutors, <FormTutor number={this.tutorsNumber} />]
    }))
  }

  submitForm(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    Http.post('/file/load_post', data).then().catch( error => 
      console.log("ERROR " + error)
      );
    }

    render() {
      return (
        <div class="ui raised very padded text container segment">
        <div class="content">
        <h2 class="ui header">Cargar archivo</h2>
        <div class="description">

        <Form id="formProject" onSubmit={ this.submitForm }>
        <Form.Field>
        <label>Titulo</label>
        <input placeholder='Titulo' name='project_title' />
        </Form.Field>
        <Form.Field>
        <label>Descripción</label>
        <textarea placeholder='Descripción' name="project_description" ></textarea>
        </Form.Field>
        <Form.Field>
        <label>Información directores, tutores y asesores</label>

        </Form.Field>

        {this.state.tutors}

        <Form.Field>
        <Button onClick={this.onAddTutor} type='button'>Añadir</Button>
        </Form.Field>
        <Form.Field>
        <label>Documentos</label>
        </Form.Field>
        <Form.Field>
        <label>Propuesta</label>
        <input type='file' name="file" />
        </Form.Field>
        <Form.Field>
        <label>Documento de soporte</label>
        <input type='file' name="supportFile" />
        </Form.Field>
        <Form.Field>
        <label>Comentarios adicionales</label>
        <textarea placeholder='Comentarios adicionales' name="comments" ></textarea>
        </Form.Field>
        <Form.Field>
        <Button type='submit'>Cargar proyecto</Button>
        </Form.Field>
        </Form>
        </div>
        </div>
        </div>
        );
    }
  }

  class LoadProjectForm extends React.Component {
    render () {
      return (
        <div>
        <LoadFile />
        </div>
        )
    }
  }

  LoadProjectForm.propTypes = {
    greeting: PropTypes.string
  };

  export default LoadProjectForm
