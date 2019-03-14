import React from "react"
import PropTypes from "prop-types"
import { Container, Header, Form, Segment } from "semantic-ui-react";
import Http from "../../services/RestServices"

const STUDENT_INFO = "jury/";

class ShowStudentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      notEditInfo: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.thesis_project_id != prevProps.thesis_project_id) {
      Http.get(STUDENT_INFO+this.props.thesis_project_id).then(response => {
        this.setState({userInfo: response.data});
      }).catch(error => 
        console.error()
      );
    }
  }
  

  render() { 
    return ( 
      <Container>
        <Header content="Información Autor del Proyecto" as="h3" dividing />
        <Segment>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Nombre'
              placeholder='Pepito' 
              defaultValue={this.state.userInfo == null? null: this.state.userInfo.name}
              readOnly={this.state.notEditInfo} />
              <Form.Input fluid label='Apellido'
              placeholder='Perez' 
              defaultValue={this.state.userInfo == null? null: this.state.userInfo.surname}
              readOnly={this.state.notEditInfo} />
              <Form.Input fluid label='Crreo'
              placeholder='email@email.com' 
              defaultValue={this.state.userInfo == null? null: this.state.userInfo.email}
              readOnly={this.state.notEditInfo} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='DNI'
              placeholder='dni' 
              defaultValue={this.state.userInfo == null? null: this.state.userInfo.dni}
              readOnly />
              <Form.Input fluid label='Institución'
              placeholder='nombre de la institución' 
              defaultValue={this.state.userInfo == null? null: this.state.userInfo.institution}
              readOnly={this.state.notEditInfo} />
              <Form.Input fluid label='País'
              placeholder='nacionalidad' 
              defaultValue={this.state.userInfo == null? null: this.state.userInfo.country}
              readOnly={this.state.notEditInfo} />
            </Form.Group>
          </Form>
        </Segment>
      </Container>
    );

  }
}


export default ShowStudentInfo
