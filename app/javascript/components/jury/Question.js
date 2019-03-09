import React from "react"
import PropTypes from "prop-types"
import {Form, Button, Segment, Icon, Header} from "semantic-ui-react"
import Http from "../../services/RestServices"

const GET_QUESTIONS_PATH = "jury/questions";

class EditQuestions extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showOtherQuestionField: (this.props.questions.length == 2),
      sendButtonContent: (this.props.questions.length == 2) ? "Questions": "Question",
    };
    this.questions = this.props.questions.map(obj => obj.question);
    this.addOrHideQuestion = this.addOrHideQuestion.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.renderAddQuestionButton = this.renderAddQuestionButton.bind(this);
    this.renderOtherQuestionField = this.renderOtherQuestionField.bind(this);
    this.sendQuestions = this.sendQuestions.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  onChangeQuestion = (num_question) => (e) => {
    this.questions[num_question] = e.target.value;
    // this.setState()
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

  renderHideButton () {
    if (this.props.questions.length < 2) {
      return (<Button content="Hide" onClick={this.addOrHideQuestion} />);
    }
    return null;
  }

  renderOtherQuestionField () {
    if (this.state.showOtherQuestionField) {
      return (
        <Segment>
          <Form.TextArea label= "Make Other Question" 
          onChange={this.onChangeQuestion(1)}
          defaultValue={this.renderQuestion(2)} />
          {this.renderHideButton()}          
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

  sendQuestions () {
    if (this.questions.length == 0) {
      alert("Make a Question");
    } else {
      if (this.questions[0] == "" || 
        (this.state.showOtherQuestionField && (this.questions[1] == null || this.questions[1] == ""))) {
        alert("Question can't be blank");
      }else {
        if (!this.state.showOtherQuestionField) {
          this.props.sendQuestions(this.questions.slice(0,1));
        } else {
          this.props.sendQuestions(this.questions);
        }
      }
    }
  }

  renderQuestion (num_question) {
    if (this.questions.length != 0) {
      if (this.questions.length >= num_question) {
        return (
          this.questions[num_question-1]
        );
      }
    }
    return "";
  }

  render () {
    return (
      <Form onSubmit={this.sendQuestions}>
      <Segment>
        <Segment.Group>
          <Segment>
            <Form.TextArea label= "Make a Question" 
            onChange={this.onChangeQuestion(0)}
            defaultValue={this.renderQuestion(1)} />
          </Segment>
          {this.renderOtherQuestionField()}
        </Segment.Group>  
          {this.renderAddQuestionButton()}
          <Button content={"Send " + this.state.sendButtonContent} type="submit" />
      </Segment>
      </Form>
    );
  }
}

//------------------------------------------------------------

class ShowQuestions extends React.Component {

  constructor (props) {
    super(props);
  }

  renderShowSecondQuestion () {
    if (this.props.questions.length == 2) {
      return (
        <Segment>
          <Header content="Second question" as="h5" />
          <Segment content={this.props.questions[1].question} />
        </Segment>
      );
    }
    return null;
  }
  render () {
    return (
      <Segment>
        <Segment.Group>
          <Segment>
            <Header content="First question" as="h5" />
            <Segment content={this.props.questions[0].question} />
          </Segment>
          {this.renderShowSecondQuestion()}
        </Segment.Group>
        <Button content="Edit" onClick={this.props.editQuestions} />
      </Segment>
    );
  }
}

//-------------------------------------------------------------------------------------

class Question extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      EditQuestions: true,
      questions: []
    };
    this.renderQuestionsOrEditQuestions = this.renderQuestionsOrEditQuestions.bind(this);
    this.editOrNot = this.editOrNot.bind(this);
  }

  componentDidUpdate (prevProps) {
    if (this.props.project_id != prevProps.project_id) {
      const params = {
        params: {
          thesis_project_id: this.props.project_id
        }
      };
      Http.get(GET_QUESTIONS_PATH, params).then(response => {
        if (response.data.length == 0) {
          this.setState({
            questions: response.data,
            EditQuestions: true
          });
        } else {
          this.setState({
            questions: response.data,
            EditQuestions:false
          });
        }
      }).catch(error => console.error(error));
    }
  }

  renderQuestionsOrEditQuestions () {
    if (this.state.EditQuestions) {      
      return <EditQuestions sendQuestions={this.props.sendQuestions} questions={this.state.questions} />
    }
    return (
      <ShowQuestions questions={this.state.questions} editQuestions={this.editOrNot} />
    );
  }

  editOrNot () {
    this.setState((state) => ({EditQuestions: !state.EditQuestions}));
  }

  render () {
    return (
      <React.Fragment>
        {this.renderQuestionsOrEditQuestions()}
      </React.Fragment>
    );
  }
}

export default Question
