import React from "react"
import PropTypes from "prop-types"
import {Form, Button, Segment, Header} from "semantic-ui-react"
import Http from "../../services/RestServices"

const GET_COMMENT_PATH = "/jury_comment"

class EditComment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment_title: "",
            comment_content: ""
        }
        this.titleOnChange = this.titleOnChange.bind(this);
        this.contentOnChange = this.contentOnChange.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }

    componentDidUpdate (prevProps) {
        if (this.props.comment[0] != prevProps.comment[0]) {
            if (this.props.comment[0] != undefined)
            {
                this.setState((state, props) => ({
                    comment_title: props.comment[0].title,
                    comment_content: props.comment[0].content
                }));
            } else {
                this.setState({comment_title: "", comment_content: ""});
            }
        }
    }

    componentDidMount () {
        console.log("props", this.props);
        const comment = this.props.comment;
        if (comment.length != 0) {
            this.setState({comment_title: comment[0].title, comment_content: comment[0].content})
        }
    }

    titleOnChange(e) {
        this.setState({comment_title: e.target.value});
    }

    contentOnChange(e) {
        this.setState({comment_content: e.target.value});
    }

    sendComment () {
        if (this.state.comment_title != "" && this.state.comment_content != "") {
            this.props.sendComment(this.state.comment_content, this.state.comment_title);
        } else {
            let msj = "The content of the concept can't be blank";
            if (this.state.comment_title == null) {
                msj = "The title can't be blank";
            }
            alert(msj);
        }

    }

    render() {

        return (<Segment >
            <Form onSubmit={this.sendComment}>
                <Form.Input label="Concept Title" placeholder="Title" onChange={this.titleOnChange} 
                    name="comment_title"
                    value={this.state.comment_title}
                />
                <Form.TextArea  label="Concept" placeholder="Description" 
                    style={{
                        height: "100px"
                    }} 
                    onChange={this.contentOnChange} name="comment_content"
                    value={this.state.comment_content}
                />
                <Button type="submit" >Enviar Concepto</Button>
            </Form>
        </Segment>);
    }
}

class ShowComment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( <Segment>
            <Header content={this.props.comment[0].title} as="h5" />
            <p> {this.props.comment[0].content} </p>
            <Button content="Edit" onClick={this.props.editOrShow} />
        </Segment> );
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            comment: [],
            EditComment: true
        }
        this.editOrShow = this.editOrShow.bind(this);
    }

    editOrShow () {
        this.setState(state => ({EditComment: !state.EditComment}));
    }

    componentDidUpdate (prevProps) {        
        if (this.props.project_id != prevProps.project_id) {
            const params = {
            params: {
                thesis_project_id: this.props.project_id
            }
            };
            Http.get(GET_COMMENT_PATH, params).then(response => {                
                if (response.data.length == 0) {
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

    renderEditOrShowComment () {
        if (this.state.EditComment) {
            return (<EditComment sendComment={this.props.sendComment} comment={this.state.comment} />);
        }
        return (<ShowComment comment={this.state.comment} editOrShow={this.editOrShow} />);
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.renderEditOrShowComment()}
            </React.Fragment>
         );
    }
}
 
export default Comment;
