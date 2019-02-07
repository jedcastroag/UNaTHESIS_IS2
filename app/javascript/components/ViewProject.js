import React from "react"
import PropTypes from "prop-types"

import { Container, Row, Col } from 'react-grid-system';

class ViewProject extends React.Component {
	render () {
		return (
			<React.Fragment>
			<Container fluid style={{ lineHeight: '32px' }}>
			<Row justify = "around">
			Informacion estudiante
			</Row>
			<br/>
			<Row justify="around" debug>
			<Col xs={3} debug>DNI estudiante</Col>
			<Col xs={3} debug>Nombres</Col>
			<Col xs={3} debug>Apellidos</Col>
			</Row>
			<br />
			<Row justify = "around" debug>
			<Col xs = {5} debug>Correo Institucional</Col>
			<Col xs = {5} debug>Perfil</Col>                
			</Row>
			<br/>
			<Row justify = "around" debug>
			<Col xs = {11} debug>Titulo</Col>
			</Row>
			<br/>
			<Row justify = "around" style={{ height: '75px' }} debug>
			<Col xs = {11} debug>Descripción</Col>
			</Row>
			<br/>
			<Row justify = "around">
			Informacion grupo de investigacion
			</Row>
			<br/>
			<Row justify = "around" debug>
			<Col xs = {5} debug>Pertenece a grupo de investigación</Col>
			<Col xs = {5} debug>Nombre</Col>
			</Row>
			<br/>
			<Row justify = "around"  debug>
			<Col xs = {5} offset={{ md: 6 }} debug>URL Hermes</Col>
			</Row>
			<br/>
			<Row justify = "around">
			Informacion directores, tutores y asesores
			</Row>
			<br/>
			<Row justify="around" debug>
			<Col xs={3} debug>DNI</Col>
			<Col xs={3} debug>Nombres</Col>
			<Col xs={3} debug>Apellidos</Col>
			</Row>
			<br/>
			<Row justify="around" debug>
			<Col xs={3} debug>Institucion</Col>
			<Col xs={3} debug>País</Col>
			<Col xs={3} debug>Rol</Col>
			</Row>
			<br/>
			<Row justify = "around" debug>
			<Col xs = {5} style={{ height: '100px' }} debug>Documentos (link para descargar)</Col>
			<Col xs = {5} style={{ height: '100px' }} debug>Observaciones Estudiante</Col>
			</Row>
			</Container>
			</React.Fragment>
			);
		}
	}

	export default ViewProject
