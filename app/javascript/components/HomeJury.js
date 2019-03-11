import React from "react"
import PropTypes from "prop-types"
import {Container, Form, Segment, Button, Header} from "semantic-ui-react"
import Home from "./jury/Home"
import Http from "../services/RestServices"

const USER_INFO = "jury/info";

class ShowPersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      notEditInfo: true
    };
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    Http.get(USER_INFO).then(response => {
      this.setState({userInfo: response.data});
    }).catch(error => 
      console.error()
    );
  }

  edit(){
    this.setState(state => ({notEditInfo: !state.notEditInfo}));
    if (!this.state.notEditInfo) {
      Http.post(USER_INFO, {
        jury: this.state.userInfo 
      }
      ).then( response =>
        {
          return console.log(response);
        }
      ).catch(error => console.error(error)
      );
    }
  }

  render() { 
    return ( 
      <Container>
        <Header content="Información Personal" as="h3" dividing />
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
              {/* <Button content={this.state.notEditInfo ? "Editar" : "Guardar"} onClick={this.edit} /> */}
          </Form>
        </Segment>
      </Container>
    );

  }
}


class HomeJury extends React.Component {
    render() {
        return (
            <div>
            <div style={{height: "10px"}}></div>
            <ShowPersonalInfo />
            <div style={{height: "10px"}}></div>
            <Home/>
        </div>);
    }
}

export default HomeJury
