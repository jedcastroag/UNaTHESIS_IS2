// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { Header, Grid, Container } from 'semantic-ui-react'
import TopMenu from './TopMenu';
import '../../../dist/semantic.min.css';

class HomeAdmin extends React.Component {

    render() {
        return (
            <div>
                <TopMenu />
                <Container>
                    <Header as='h2' textAlign='center'>
                        Header
                </Header>
                </Container>
                
                
            </div>

        );
    }
}



export default HomeAdmin
