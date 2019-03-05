import React from "react"
import PropTypes from "prop-types"
import {Form, Button, Segment, Icon} from "semantic-ui-react"
import Http from "../../services/RestServices"

const GET_QUESTIONS_PATH = "/jury_questions";

class EditQuestions extends React.Component {

  render () {
    
  }
}

class Question extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      sendButtonContent: "Question",
      showOtherQuestionField: false,
      questions: [],
      EditQuestions: false
    };
    this.questions = ["",""];
    this.addOrHideQuestion = this.addOrHideQuestion.bind(this);
    this.renderOtherQuestionField = this.renderOtherQuestionField.bind(this);
    this.renderAddQuestionButton = this.renderAddQuestionButton.bind(this);
    this.sendQuestions = this.sendQuestions.bind(this);
  }

  componentDidUpdate (prevProps) {
    if (this.props.project_id != prevProps.project_id) {
      const params = {
        params: {
          thesis_project_id: this.props.project_id
        }
      };
      Http.get(GET_QUESTIONS_PATH, params).then(response => {
        this.setState({
          questions: response.data
        });
        console.log(this.state);
      }).catch(error => console.error(error));
    }
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
          <Form.Input label= "Make Other Question" name="second_question" onChange={this.onChangeQuestion(1)} />
          <Button content="Hide" onClick={this.addOrHideQuestion} />
        </Segment>
      );
    }
    return null;
  }

  sendQuestions () {
    if (this.state.questions.length == 0) {
      alert("Make a Question");
    } else {
      if (this.state.questions[0] == "" || (this.state.showOtherQuestionField && this.questions[1] == "")) {
        alert("Question can't be blank");
      }else {
        this.props.sendQuestions(this.state.questions);
      }
    }
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

  onChangeQuestion = (num_question) => (e) => {
    this.questions[num_question] = e.target.value;
    this.setState({questions: this.questions});
  }

  render () {
    return (
      <Form>
      <Segment>
        <Segment.Group>
          <Segment>
            <Form.Input label= "Make a Question" name="question" onChange={this.onChangeQuestion(0)} />
          </Segment>
          {this.renderOtherQuestionField()}
        </Segment.Group>  
          {this.renderAddQuestionButton()}
          <Button content={"Send " + this.state.sendButtonContent} onClick={this.sendQuestions} />
      </Segment>
      </Form>
    );
  }
}

export default Question
