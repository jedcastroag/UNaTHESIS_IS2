import React from "react"
import PropTypes from "prop-types"
import { Table, Button } from 'semantic-ui-react'
import Http from '../services/RestServices'
import { Link } from 'react-router-dom'


const RowUser = props => (
    <Table.Row>
        <Table.Cell>{props.name}</Table.Cell>
        <Table.Cell>{props.surname}</Table.Cell>
        <Table.Cell>{props.email}</Table.Cell>

        <Table.Cell selectable positive>
            <a onClick={function(){
                Http.post(`/admin/delete_user`, {
                    params: {
                        user_id: props.id
                    }
                }).then(res => {
                    window.location.reload()
                })
            }
                }>Eliminar</a>
        </Table.Cell>
    </Table.Row>
)


class UsersAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                user_rows: []
            }
    }
    
    
    componentDidMount() {
        Http.get(`/admin/fetch_users_data`)
            .then(res => {
                for (var i = 0; i < res['data'].length; i++) {
                    var user = res['data'][i]
                    this.setState(prevState => ({
                        user_rows: [...prevState.user_rows, <RowUser name={user.name} surname={user.surname} email={user.email} />]
                    }))
                }
            })

    }


    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nombres</Table.HeaderCell>
                            <Table.HeaderCell>Apellidos</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Eliminar</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.user_rows}

                    </Table.Body>
                </Table>
            </div>
        );
    }
}


export default UsersAdmin
