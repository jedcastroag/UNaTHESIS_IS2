import React from "react"
import PropTypes from "prop-types"
import HomeJury from "./HomeJury"
import HomeTutor from './HomeTutor'
import {Button} from "semantic-ui-react"

class JuryTutorHome extends React.Component {

  constructor(props) {
    super(props);
    this.renderJuryHome = this.renderJuryHome.bind(this);
    this.renderTutorHome = this.renderTutorHome.bind(this);
  }

  renderJuryHome () {
    return (<HomeJury />);
  }

  renderTutorHome () {
    return (<HomeTutor />);
  }
  render () {
    return (
      <React.Fragment>
        <div style={{height: "100px"}} />
        <Button content="Jury View" onClick={this.renderJuryHome} />
        <Button content="Tutor View" onClick={this.renderTutorHome} />
      </React.Fragment>
    );
  }
}

export default JuryTutorHome
