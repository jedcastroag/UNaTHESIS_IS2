import React from "react"
import PropTypes from "prop-types"

import { Route, Redirect } from 'react-router-dom'

import auth from '../services/Auth'

export default ({ componentProps = null, component: Component, restricted = true, ...otherConfig }) => (
	<Route {...otherConfig} render={(props) => (!restricted || auth.isAuthenticated() || !auth.isAuthenticated()) ? 
		( <Component {...props} {...componentProps}/> ) : 
		( <Redirect to={{ pathname: "/login", state: { referrer: props.location } }} />) 
	} />
	);

