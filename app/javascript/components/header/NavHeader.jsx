import React from "react"
import PropTypes from "prop-types"
import {Segment, Grid} from "semantic-ui-react"
import NavList from "./NavList";
import "../../../../dist/semantic.min.css";

const menu = [
    [
        "UNThesis", "/"
    ],
    [
        "Inicio", "/"
    ],
    [
        "Buscar Proceso", "/"
    ],
    [
        "Nuevo Proceso", "process/new"
    ],
    [
        "Notificaciones", "/"
    ],
    [
        "Cerrar Sesión", "/"
    ]
];

class NavHeader extends React.Component {

    render() {
        return (<Segment>
            <NavList links={menu} key="header_links"/>
        </Segment>);

    }
}

NavHeader.propTypes = {
    links: PropTypes.array
}

export default NavHeader
