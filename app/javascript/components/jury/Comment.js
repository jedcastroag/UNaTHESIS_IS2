import React, {Component} from "react"
import PropTypes from "prop-types"
import {Form, Button, Segment, Header, Message} from "semantic-ui-react"
import Field from "./Field";
import Http from "../../services/RestServices"

const COMMENT_PATH = "jury/comment"

class EditComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title_fulfilled: true,
            content_fulfilled: true
        }
        this.title = this.content = "";
    }

    componentDidUpdate = prevProps => {
        const {title, content} = this.props.comment
        prevProps.comment.title != title ? (
            title == undefined ? this.title = "" : (
                this.title = title,
                this.setState({title_fulfilled: true})
            )
        ) : null;
        prevProps.comment.content != content ? (
            content == undefined ? this.content = "" : (
                this.content = content, 
                this.setState({content_fulfilled: true})
            )
        ) : null;
    }

    componentDidMount = () => {        
        const {title, content} = this.props.comment
        if (title != undefined) {
            this.title = title
            this.content = content
        }
    }

    is_empty = (str) => {
        return str.trim() == "";
    }

    getContent = name => content => {
        this[name] = content;
        if (!this.state[name]) {
            this.setState({
                [name == "content" ? "content_fulfilled": "title_fulfilled"]: true
            })
        }
    }

    sendComment = () => {
        const title_empty = this.is_empty(this.title);
        const content_empty = this.is_empty(this.content);
        this.setState({
            title_fulfilled: !title_empty,
            content_fulfilled: !content_empty,
        });
        if (title_empty|| content_empty) return;
        this.props.sendComment(this.content, this.title);
    }

    render() {
        const {comment} = this.props;
        return (<Segment >
            <Form warning onSubmit={this.sendComment}>
                <Field as="TextInput" label="Título" key="comment_title"
                    retrieveContent={this.getContent("title")} 
                    name="title"
                    content={comment.title == undefined?"":comment.title}
                />
                {!this.state.title_fulfilled? 
                    <Message warning header="No puede estar vacio" /> :
                    null}
                <Field as="TextArea"  label="Concepto" key="comment_content"
                    retrieveContent={this.getContent("content")} 
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

//========================================================================================

const ShowComment = (props) => {
    return ( <Segment>
        <Header content={props.comment.title} as="h5" />
        <p> { props.comment.content} </p>
        <Button content="Editar" onClick={props.editOrShow} />
    </Segment> );
}

//========================================================================================

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comment: {},
            EditComment: true,
        }
    }

    editOrShow = () => {
        this.setState(state => ({EditComment: !state.EditComment}));
    }

    sendComment =  (comment_content, comment_title) => {   
        if (this.props.project_id == null) {
            alert("Debe Seleccionar un Proyecto");
        } else {
            const data = {
            jury: {title: comment_title, 
                thesis_project_id: this.props.project_id,
                content: comment_content}
            };
            Http.post(COMMENT_PATH, data).then((response) => {
                alert(response.data.message);
                this.setState({
                    comment: {
                        title: comment_title,
                        content: comment_content
                    },
                    EditComment: false
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
            Http.get(COMMENT_PATH, params).then(response => {       
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
                    <EditComment sendComment={this.sendComment} comment={this.state.comment}
                    hasSubmitted={this.editOrShow} />:
                    <ShowComment comment={this.state.comment} editOrShow={this.editOrShow} />}
            </React.Fragment>
        );
    }
}
 
export default Comment;
