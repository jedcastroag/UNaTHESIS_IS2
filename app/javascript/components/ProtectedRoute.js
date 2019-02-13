import React from "react"
import PropTypes from "prop-types"
import {Route, Redirect} from "react-router-dom"

export default({
    component: Component,
    restricted = true,
    ...otherConfig
}) => <Route {...otherConfig} render={(
        ) => (!restricted)
        ? (<Component />)
        : (<Redirect to="/"/>)}/>;
