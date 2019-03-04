import React from "react"
import PropTypes from "prop-types"
import {Form, Button, Segment, Icon} from "semantic-ui-react"

class Question extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      sendButtonContent: "Question",
      showOtherQuestionField: false
    };
    this.addOrHideQuestion = this.addOrHideQuestion.bind(this);
    this.renderOtherQuestionField = this.renderOtherQuestionField.bind(this);
    this.renderAddQuestionButton = this.renderAddQuestionButton.bind(this);
  }

  addOrHideQuestion () {
    this.setState(state => ({
      showOtherQuestionField: !state.showOtherQuestionField
    }));
    if (this.state.showOtherQuestionField) {
      this.setState({sendButtonContent: "Question"});
    }else{
      this.setState({sendButtonContent: "Questions"});
    }
  }

  renderOtherQuestionField () {
    if (this.state.showOtherQuestionField) {
      return (
        <Segment>
          <Form.Input label= "Make Other Question" name="second_question" />
          <Button content="Hide" onClick={this.addOrHideQuestion} />
        </Segment>
      );
    }
    return null;
  }

  renderAddQuestionButton () {
    if (!this.state.showOtherQuestionField) {
      return (
        <Button icon onClick={this.addOrHideQuestion} >
          <Icon name="plus circle"/>
        </Button>
      );
    }
    return null;
  }

  render () {
    return (
      <Form>
      <Segment>
        <Segment.Group>
          <Segment>
            <Form.Input label= "Make a Question" name="question" />
          </Segment>
          {this.renderOtherQuestionField()}
        </Segment.Group>  
          {this.renderAddQuestionButton()}
          <Button content={"Send " + this.state.sendButtonContent} />
      </Segment>
      </Form>
    );
  }
}

export default Question
