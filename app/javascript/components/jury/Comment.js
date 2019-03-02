import React from "react"
import PropTypes from "prop-types"
import {Form, Button, Segment} from "semantic-ui-react"
import AddComment from "../../services/RestServices"

class Comment extends React.Component {

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
                <Form.Input label="Título del Concepto" placeholder="Título del Comentario" onChange={this.titleOnChange} name="comment_title"/>
                <Form.TextArea  label="Concepto" placeholder="Descripción" style={{
                        height: "100px"
                    }} onChange={this.contentOnChange} name="comment_content"/>
                <Button type="submit" >Enviar Concepto</Button>
            </Form>
        </Segment>);
    }
}

export default Comment
