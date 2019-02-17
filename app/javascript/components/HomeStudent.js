import React from "react"
import PropTypes from "prop-types"
class HomeStudent extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		console.log(this.props);
		return (
			<h1>Home Student</h1>
		);
	}
}

	export default HomeStudent
