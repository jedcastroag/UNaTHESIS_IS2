import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

import { withRouter } from 'react-router-dom';

class ModalTokenExpired extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open
        }
    }
    
    show = () => this.setState({ open: true })
    close = () => {
        console.log("CLOSE");
        this.setState({ open: false });
        // this.props.history.push("/login");
    }
    
    render() {        
        return (
            <div>
            <Modal dimmer='blurring' open={ this.state.open } onClose={ this.close }>
            <Modal.Header>Tu sesión ha terminado</Modal.Header>
            <Modal.Content image>
            <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
            <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button color='black' onClick={this.close}>
            Nope
            </Button>
            <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content="Yep, that's me"
            onClick={this.close}
            />
            </Modal.Actions>
            </Modal>
            </div>
            )
        }
    }
    
    export default withRouter(ModalTokenExpired)