import React from "react"
import PropTypes from "prop-types"
import HomeJury from "./HomeJury"
import HomeTutor from './HomeTutor'
import {Tab, Container} from "semantic-ui-react"

class JuryTutorHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      both_roles: null
    };
  }
  render () {
    const panes = [
      {

        menuItem: 'Jurado',
        render: () => (<Tab.Pane key="JuryHome">
          <HomeJury />
          </Tab.Pane>)
      },
      {
        menuItem: 'Tutor',
        render: () => (<Tab.Pane key="TutorHome">
          <HomeTutor />
        </Tab.Pane>)
      }
    ]
    return (
      <Container>
        <Tab menu={{secondary: true, pointing: true}} panes={panes} />
      </Container>
    );
  }
}

export default JuryTutorHome
