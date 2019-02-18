import React from "react"
import PropTypes from "prop-types"
import NewProcess from "./admin/NewProcess"
import JuryHome from "./jury/Home"
import ProtectedRoute from './ProtectedRoute'
import NavHeader from "./header/NavHeader"
import Login from "../packs/hello_react"

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'




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

const routes = [
    {
        path: "/jury",
        exact: null,
        component: JuryHome,
        restricted: false
    },
    {
        path: "/",
        exact: null,
        component: Login,
        restricted: true
    }
];

class App extends React.Component {
    constructor() {
        super();

        this.routes = routes;
        this.routes.push({path: "/process/new", exact: null, component: NewProcess, restricted: false});
    }
    render() {
        return (
        <div>
            <NavHeader/>
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
