// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { Header, Grid, Container } from 'semantic-ui-react'

import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';
class HomeAdmin extends React.Component {
    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }
    constructor(props) {
        super(props);
        
        this.state = {
            date: '',
            time: '',
            dateTime: '',
            datesRange: ''
        };
    }
    render() {
        return <Container>
        <DateInput
        inline
        name='date'
        value={ this.state.date }
        onChange={ this.handleDateChange }
        />
        </Container>;
    }
}

export default HomeAdmin
