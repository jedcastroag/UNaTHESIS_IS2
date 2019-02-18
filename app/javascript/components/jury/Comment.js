import React from "react"
import PropTypes from "prop-types"
import {Form, Button} from "semantic-ui-react"
import AddComment from "../../services/SendToServer"

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment_title: "",
            comment_content: ""
        }
    }

    titleOnChange(e) {
        this.setState({comment_title: e.target.value});
    }

    contentOnChange(e) {
        this.setState({comment_content: e.target.value});
    }

    sendComment = () => {
        AddComment.addData("/jury",this.state).then((response) => console.log(response));
    }

    render() {

        return (<Form onSubmit={this.sendComment.bind(this)}>
            <Form.Input placeholder="Título del Comentario" onChange={this.titleOnChange.bind(this)} name="comment_title"/>
            <Form.TextArea placeholder="Comentario" style={{
                    height: "100px"
                }} onChange={this.contentOnChange.bind(this)} name="comment_content"/>
            <Button type="submit">Enviar</Button>
        </Form>);
    }
}

export default Comment
