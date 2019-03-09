import React from 'react'

import TopMenu from './TopMenu';
import { Container, Header } from 'semantic-ui-react'

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