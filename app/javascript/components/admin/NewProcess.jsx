import React from "react"
import PropTypes from "prop-types"
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message,
    Container
} from 'semantic-ui-react'

class NewProcess extends React.Component {
    constructor() {
        super();

    }
    render() {
        return (<React.Fragment>
            Email: {this.props.email}
        </React.Fragment>);
    }
}

NewProcess.propTypes = {
    email: PropTypes.string
};
export default NewProcess
