import React from "react"
import PropTypes from "prop-types"
import { Field } from "./Field";
import {Form, Button, Segment, Icon, Header, Message} from "semantic-ui-react"
import Http from "../../services/RestServices"

const GET_QUESTIONS_PATH = "jury/questions";

class EditQuestions extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showOtherQuestionField: (this.props.questions.length == 2),
      sendButtonContent: (this.props.questions.length == 2) ? "Preguntas": "Pregunta",
      q1Fulfilled: true,
      q2Fulfilled: true
    };
    this.questions = ["",""]
    this.addOrHideQuestion = this.addOrHideQuestion.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.renderAddQuestionButton = this.renderAddQuestionButton.bind(this);
    this.renderOtherQuestionField = this.renderOtherQuestionField.bind(this);
    this.sendQuestions = this.sendQuestions.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  onChangeQuestion = (num_question) => (e) => {
    this.questions[num_question] = e.target.value;
    num_question == 0 ? ( !this.state.q1Fulfilled ? 
      this.setState({q1Fulfilled:true}): null
      ) : (
        !this.state.q2Fulfilled ? 
        this.setState({q2Fulfilled: true}): null
      )
  }

  addOrHideQuestion () {
    this.setState(state => ({
      showOtherQuestionField: !state.showOtherQuestionField
    }));
    if (this.state.showOtherQuestionField) {
      this.setState({sendButtonContent: "Pregunta"});
    }else{
      this.setState({sendButtonContent: "Preguntas"});
    }
  }

  renderHideButton () {
    if (this.props.questions.length < 2) {
      return (<Button content="Quitar" onClick={this.addOrHideQuestion} />);
    }
    return null;
  }

  renderOtherQuestionField () {
    if (this.state.showOtherQuestionField) {
      return (
        <Segment>
          <Form.TextArea label= "Otra pregunta" 
          onChange={this.onChangeQuestion(1)}
          defaultValue={this.renderQuestion(2)}
          />
          {!this.state.q2Fulfilled ? <Message
                warning
                header="Este campo no puede estar vacio"
            /> : null}
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

  is_empty = (str) => {
    return str.trim() == "";
  }

  sendQuestions () {
    
    const is_empty_q1 = this.is_empty(this.questions[0])
    const is_empty_q2 = this.is_empty(this.questions[1])
    this.setState((state) => ({
      q1Fulfilled: !is_empty_q1,
      q2Fulfilled: !state.showOtherQuestionField ? true: !is_empty_q2 
    }));

    if(!is_empty_q1 && !this.state.showOtherQuestionField ) {
      this.props.sendQuestions(this.questions.slice(0,1));
      return;
    }

    if(!is_empty_q1 && !is_empty_q2) {
      this.props.sendQuestions(this.questions);
      return;
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
      <Form onSubmit={this.sendQuestions} warning>
        <Segment.Group>
          <Segment>
            <Form.TextArea label= "Una pregunta" 
            onChange={this.onChangeQuestion(0)}
            defaultValue={this.renderQuestion(1)} />
            {!this.state.q1Fulfilled ? <Message
                warning
                header="Este campo no puede estar vacio"
            /> : null}
          </Segment>
          {this.renderOtherQuestionField()}
        </Segment.Group>  
          {this.renderAddQuestionButton()}
          <Button content={"Enviar " + this.state.sendButtonContent} type="submit" />
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
      <div>
        <Segment.Group>
          <Segment>
            <Header content="First question" as="h5" />
            <Segment content={this.props.questions[0].content} />
          </Segment>
          {this.renderShowSecondQuestion()}
        </Segment.Group>
        <Button content="Edit" onClick={this.props.editQuestions} />
      </div>
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
