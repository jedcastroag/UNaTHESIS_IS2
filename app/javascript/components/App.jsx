import React from "react"
import PropTypes from "prop-types"
import NewProcess from "./admin/NewProcess"
import ProtectedRoute from './ProtectedRoute'

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import add_student from '../services/add_user'

/**
 * All the application's paths must be declarated this.
 *
 * @type {Array}
 * @property {string} path Route to be driven.
 * @property {boolean} restricted True or not define for indicate that the path will
 *                                be restricted (only authenticated users can access), False.
 * @property {Map} componentParams Parameters of the component
 *
 * More properties (https://reacttraining.com/react-router/web/api/Route)
 */
const routes = [];

class App extends React.Component {
    constructor() {
        super();

        this.routes = routes;
        this.routes.push({path: "/new_process", exact: null, component: NewProcess, restricted: false});
    }
    render() {
        return (<div>
            <BrowserRouter>
                <Switch>
                    {
                        this.routes.map(function(route, index) {
                            return <ProtectedRoute { ...route } key={index}/>;
                        }, this)
                    }
                    <Route exact render={() => {
                            window.location.href = "404.html"
                        }}/>
                </Switch>
            </BrowserRouter>
        </div>);
    }
}

export default App
