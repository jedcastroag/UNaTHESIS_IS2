import React from 'react'
import jQuery from 'jquery';
import $ from 'jquery';
import ReactDOM from 'react-dom'
import TopMenu from './TopMenu';
import { Container, Header } from 'semantic-ui-react'
import '../../../dist/semantic.min.css';
import '../../assets/javascripts/dataTables/datatables.min.js'
import '../../assets/javascripts/dataTables/datatables.min.css'


class UsersAdministrator extends React.Component {



    render() {
        return (
            <div>
                <TopMenu />
                <Container>
                    <Header as='h2' textAlign='center'>
                            
                    </Header>
                </Container>

            </div>
        );
    }
}



export default UsersAdministrator