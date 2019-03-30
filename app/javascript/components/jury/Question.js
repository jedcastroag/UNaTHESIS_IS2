import React from "react"
import PropTypes from "prop-types"
import Field from "./Field";
import {Form, Button, Segment, Icon, Header, Message} from "semantic-ui-react"
import Http from "../../services/RestServices"

const QUESTIONS_PATH = "jury/questions";

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
  }

  componentDidUpdate (prevProps) {
    const contents =this.props.questions.map(question => question.content);
    const prevContents = prevProps.questions.map(question => question.content);
    contents[0] != prevContents[0] && (
      this.questions[0] = contents[0] == undefined ? "" : contents[0],
      this.setState({q1Fulfilled:true})
    )
    contents[1] != prevContents[1] && (
      this.questions[1] = contents[1] == undefined ? "" : contents[1],
      this.setState({q1Fulfilled:true})
    )
  }

  componentDidMount () {
    const {questions} = this.props;
    this.questions[0] = questions[0] == undefined ? "" : questions[0].content
    this.questions[1] = questions[1] == undefined ? "" : questions[1].content
  }

  onChangeQuestion = num_question => content =>{
    this.questions[num_question] = content;
    num_question == 0 ? ( !this.state.q1Fulfilled ? 
    this.setState({q1Fulfilled:true}): null
    ) : (
      !this.state.q2Fulfilled ? 
      this.setState({q2Fulfilled: true}): null
    )
  }

  addOrHideQuestion = () => {
    this.setState(state => ({
      showOtherQuestionField: !state.showOtherQuestionField,
      sendButtonContent: !state.showOtherQuestionField? "Preguntas" : "Pregunta"
    }));
  }

  is_empty = (str) => {
    return str.trim() == "";
  }

  sendQuestions = () => {
    
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
    }
    
  }

  render () {
    const {questions} = this.props;
    return (
      <Form onSubmit={this.sendQuestions} warning>
        <Segment.Group>
          <Segment>
            <Field as="TextArea" label= "Primera pregunta" retrieveContent={this.onChangeQuestion(0)}
            content={questions.length == 0 ? "" : questions[0].content} />
            {!this.state.q1Fulfilled && <Message warning
            header="Este campo no puede estar vacio" />}
          </Segment>

          {this.state.showOtherQuestionField && 
            <Segment>
              <Field as="TextArea" label= "Segunda Pregunta" retrieveContent={this.onChangeQuestion(1)}
              content={questions.length != 2 ? "" : questions[1].content} />
              {!this.state.q2Fulfilled && <Message warning
              header="Este campo no puede estar vacio" />}
              <Button content="Ocultar" onClick={this.addOrHideQuestion} />           
            </Segment>
          }
        </Segment.Group>  

        {!this.state.showOtherQuestionField &&
          <Button icon onClick={this.addOrHideQuestion} >
            <Icon name="plus circle"/>
          </Button>
        }

        <Button content={"Enviar " + this.state.sendButtonContent} type="submit" />
      </Form>
    );
  }
}

//========================================================================================

const ShowQuestions = (props) => {
  return (
    <div>
      <Segment>
        <React.Fragment>
          <Header content="Primera Pregunta" as="h5" dividing />
          <p>{props.questions[0].content}</p>
        </React.Fragment>
        {props.questions.length == 2 &&
          <React.Fragment>
            <Header content="Segunda Pregunta" as="h5" dividing />
            <p>{props.questions[1].content}</p>
          </React.Fragment>
        }
      </Segment>
      <Button content="Editar" onClick={props.editQuestions} />
    </div>
  );
}

//========================================================================================

class Question extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      EditQuestions: true,
      questions: []
    };
  }

  sendQuestions = questions => {
    if (this.props.project_id == null) {
        alert("Debe Seleccionar un Proyecto");
    } else {
      const data = {
          jury: {
              questions: questions,
              thesis_project_id: this.props.project_id
          }
      };
      Http.post(QUESTIONS_PATH, data).then(response => {
        alert(response.data.message);
        this.setState({
          questions: questions.map(question => ({content: question})),
          EditQuestions: false
        });
      }).catch(error => console.error(error));
    }
}

  componentDidUpdate = (prevProps) => {
    if (this.props.project_id != prevProps.project_id) {
      const params = {
        params: {
          thesis_project_id: this.props.project_id
        }
      };
      Http.get(QUESTIONS_PATH, params).then(response => {
        const {data} = response;
        this.setState({
          questions: data.length == 0 ? [] : data,
          EditQuestions: data.length == 0
        })
      }).catch(error => console.error(error));
    }
  }

  editOrNot = () => {
    this.setState((state) => ({EditQuestions: !state.EditQuestions}));
  }

  render () {
    return (
      <React.Fragment>
        {this.state.EditQuestions?
        <EditQuestions sendQuestions={this.sendQuestions} questions={this.state.questions} />:
        <ShowQuestions questions={this.state.questions} editQuestions={this.editOrNot} />}
      </React.Fragment>
    );
  }
}

export default Question
