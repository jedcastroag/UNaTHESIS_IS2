import React, {Component} from "react"
import PropTypes from "prop-types"
import {Form, Button, Segment, Header, Message} from "semantic-ui-react"
import Field from "./Field";
import Http from "../../services/RestServices"

const GET_COMMENT_PATH = "jury/comment"

class EditComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title_fulfilled: true,
            content_fulfilled: true   
        }
        this.title = this.content = "";
    }

    is_empty = (str) => {
        return str.trim() != "";
    }

    getTitle = (title) => {
        this.title = title;
        if (!this.state.title_fulfilled) {
            this.setState({
                title_fulfilled:true
            })
        }
    }
    getContent = (content) => {
        this.content = content;
        if (!this.state.content_fulfilled) {
            this.setState({
                content_fulfilled:true
            })
        }
    }

    sendComment = () => {
        const title_empty = this.is_empty(this.title);
        const content_empty = this.is_empty(this.content);
        this.setState({
            title_fulfilled: title_empty,
            content_fulfilled: content_empty,
        });
        if (!title_empty|| !content_empty) return;
        this.props.sendComment(this.content, this.title);
    }

    render() {

        const {comment} = this.props;
        return (<Segment >
            <Form warning onSubmit={this.sendComment}>
                <Field as="TextInput" label="Título"
                    retrieveContent={this.getTitle} 
                    name="title"
                    content={comment.title == undefined?"":comment.title}
                />
                {!this.state.title_fulfilled? 
                    <Message warning header="No puede estar vacio" /> :
                    null}
                <Field as="TextArea"  label="Concepto"
                    retrieveContent={this.getContent} 
                    name="content"
                    content={comment.content == undefined?"":comment.content}
                />
                {!this.state.content_fulfilled? 
                    <Message warning header="No puede estar vacio" /> :
                    null}
                <Button type="submit" >Enviar Concepto</Button>
            </Form>
        </Segment>);
    }
}

const ShowComment = (props) => {
    return ( <Segment>
        <Header content={props.comment.title} as="h5" />
        <p> { props.comment.content} </p>
        <Button content="Editar" onClick={props.editOrShow} />
    </Segment> );
}

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comment: {},
            EditComment: true
        }
    }

    editOrShow = () => {
        this.setState(state => ({EditComment: !state.EditComment}));
    }

    componentDidUpdate = (prevProps) => {        
        if (this.props.project_id != prevProps.project_id) {
            const params = {
            params: {
                thesis_project_id: this.props.project_id
            }
            };
            Http.get(GET_COMMENT_PATH, params).then(response => {  
                console.log(response);              
                if (Object.keys(response.data).length == 0) {
                    this.setState({
                    comment: response.data,
                    EditComment: true
                    });
                } else {
                    this.setState({
                    comment: response.data,
                    EditComment:false
                    });
                }
            }).catch(error => console.error(error));
        }
    }
    render() { 
        return ( 
            <React.Fragment>
                {this.state.EditComment ? 
                    <EditComment sendComment={this.props.sendComment} comment={this.state.comment} />:
                    <ShowComment comment={this.state.comment} editOrShow={this.editOrShow} />}
            </React.Fragment>
         );
    }
}
 
export default Comment;
