import React from "react"
import PropTypes from "prop-types"
import {Container, Form, Segment, Button, Header} from "semantic-ui-react"
import Home from "./jury/Home"

class HomeJury extends React.Component {
    render() {
        return (
            <div>
            <div style={{height: "10px"}}></div>
            <Home/>
        </div>);
    }
}

export default HomeJury
