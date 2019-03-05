import React from 'react'
import ReactDOM from 'react-dom'

import { Dropdown, Menu, Segment } from 'semantic-ui-react'
import '../../../dist/semantic.min.css';

class TopMenu extends React.Component {
    render() {
        return (
            <div>
                <Menu pointing>
                    <Menu.Item 
                        name='inicio' 
                        active={true}
                    />
                    <Menu.Item
                        name='base_de_datos'
                    />
                    <Dropdown item text='Display Options'>
                        <Dropdown.Menu>
                            <Dropdown.Header>Text Size</Dropdown.Header>
                            <Dropdown.Item>Small</Dropdown.Item>
                            <Dropdown.Item>Medium</Dropdown.Item>
                            <Dropdown.Item>Large</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='perfil'
                            
                        />
                        <Menu.Item
                            name='cerrar_sesion'
                            
                        />
                    </Menu.Menu>
                </Menu>

            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <div>
            <LoadProject />
        </div>,
        document.body.appendChild(document.createElement('div')),
    )
})


export default TopMenu