import React from "react"
import PropTypes from "prop-types"
import {Container, Grid, Segment, Header} from "semantic-ui-react"
import Http from "../services/RestServices";

class TutorInfo extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      personal_info: {}
    }
  }

  componentDidMount() {  
      Http.get('/getUserInfo')        
      .then(res => {
          this.setState({
            personal_info: res.data
          })            
      }).catch(
        err => console.error(err)
      )
  }

  render() {
      return (
          <div>
          <Header content="Tu Información Personal" as="h3" />
          <Grid container columns ={3} stackable>
            <Grid.Row>
              <Grid.Column>                
                  <label>Nombre</label>                
                  <Segment>
                      <p>{this.state.personal_info.name}</p>
                  </Segment>   
              </Grid.Column>
              <Grid.Column>
                  <label>Apellidos</label>                
                  <Segment>
                      <p >{this.state.personal_info.surname}</p>
                  </Segment>
              </Grid.Column>
              <Grid.Column>
                  <label>Correo</label>  
                  <Segment>
                      <p>{this.state.personal_info.email}</p>    
                  </Segment>              
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column>                
                  <label>DNI</label>                
                  <Segment>
                      <p>{this.state.personal_info.dni}</p>
                  </Segment>   
              </Grid.Column>
              <Grid.Column>
                  <label>Institución</label>                
                  <Segment>
                      <p >{this.state.personal_info.institution}</p>
                  </Segment>
              </Grid.Column>
              <Grid.Column>
                  <label>País</label>  
                  <Segment>
                      <p>{this.state.personal_info.country}</p>    
                  </Segment>              
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </div>
      )
  }
  
}

class JuryTutorHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      both_roles: null
    };
  }
  render () {
    return (
      <Container>
        <h2 className="ui center aligned header">Bienvenido </h2>
        <TutorInfo />
      </Container>
    );
  }
}

export default JuryTutorHome
