import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from 'react-grid-system';
class LoadProjectForm extends React.Component {
  render () {
    return (
    <Container>
      <Row>
        <Col sm={12}>
          <Row>
            <Col sm={4}>
              <label>Nombre proyecto:</label>

            </Col>
          <Col sm={8}>
            <input type="text" name="post[name]"></input>
          </Col>

          </Row>
          
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <label>Descripcion proyecto:</label>
          <textarea name="post[description]" rows="4" cols="50"></textarea>
        </Col>
      </Row>
    </Container>
    );
  }
}

LoadProjectForm.propTypes = {
  greeting: PropTypes.string
};
export default LoadProjectForm
