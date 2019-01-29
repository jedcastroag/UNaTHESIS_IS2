// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Button, Input, Checkbox, Form } from 'semantic-ui-react'
import '../../../dist/semantic.min.css';
import { runInThisContext } from 'vm';

const FormTutor = props => (
    <div className="formTutor">
        <Form.Group inline>
            <Form.Field>
                <label>Dni</label>
                <input placeholder='Dni' name={'dni_'+props.number} />
            </Form.Field>
            <Form.Field>
                <label>Nombres</label>
                <input placeholder='Nombres' name={'nombres_'+props.number} />
            </Form.Field>
            <Form.Field>
                <label>Apellidos</label>
                <input placeholder='Apellidos' name={'apellidos_'+props.number} />
            </Form.Field>
        </Form.Group>
        <Form.Group inline>
            <Form.Field>
                <label>Institución</label>
                <input placeholder='Institución' name={'institucion_'+props.number} />
            </Form.Field>
            <Form.Field>
                <label>País</label>
                <input placeholder='País' name={'pais_'+props.number} />
            </Form.Field>
            <Form.Field>
                <label>Rol</label>
                <select name={'rol_'+props.number}>
                    <option>Director</option>
                    <option>Tutor</option>
                    <option>Asesor</option>
                </select>
            </Form.Field>
        </Form.Group>
    </div>
)



class LoadFile extends React.Component {
    tutorForm = [<FormTutor number={0} />];

    
    onAddTutor = () => {
        this.tutorForm.push(<FormTutor number={this.tutorForm.length} />)
    }


    render() {
        return (
                <div class="ui raised very padded text container segment">
                    <div class="content">
                        <h2 class="ui header">Cargar archivo</h2>
                        <div class="description">
                            <Form>
                                <Form.Field>
                                    <label>Titulo</label>
                                    <input placeholder='Titulo' name='titulo' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Descripción</label>
                                    <textarea placeholder='Descripción' name="descripcion" ></textarea>
                                </Form.Field>
                                <Form.Field>
                                    <label>Información directores, tutores y asesores</label>

                                </Form.Field>
                                {this.tutorForm}


                                <Form.Field>
                                    <Button onClick={this.onAddTutor} >Añadir</Button>
                                </Form.Field>
                                <Form.Field>
                                    <label>Documentos</label>
                                </Form.Field>
                                <Form.Field>
                                    <label>Propuesta</label>
                                    <input type='file' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Documento de soporte</label>
                                    <input type='file' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Comentarios adicionales</label>
                                    <textarea placeholder='Comentarios adicionales' name="descripcion" ></textarea>
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

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <div>
            <LoadFile />
        </div>,
        document.body.appendChild(document.createElement('div')),
    )
})
