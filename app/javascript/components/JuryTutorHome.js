import React from "react"
import PropTypes from "prop-types"
import HomeJury from "./HomeJury"
import HomeTutor from './HomeTutor'
import {Tab} from "semantic-ui-react"

class JuryTutorHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      both_roles: null
    };
  }

  tabs () {
    const panes = []
    if (this.props.data.is_jury) {
      panes.push({
        menuItem: 'Jury',
        render: () => (<Tab.Pane>
          <HomeJury />
        </Tab.Pane>)
      });
    }
    if (this.props.data.is_tutor) {
      panes.push({
        menuItem: 'Tutor',
        render: () => (<Tab.Pane>
          <HomeTutor />
        </Tab.Pane>)
      });
    }
    return  panes;
  }
  render () {
    return (
      <React.Fragment>
        <Tab menu={{secondary: true, pointing: true}} panes={this.tabs()} />
      </React.Fragment>
    );
  }
}

export default JuryTutorHome
