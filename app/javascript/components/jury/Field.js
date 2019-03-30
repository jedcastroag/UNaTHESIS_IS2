import React from "react"
import PropTypes from "prop-types"
import {Form} from "semantic-ui-react"

class Field extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ""
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.content != prevProps.content) {
      this.setState({
        content: this.props.content
      })
    }
  }

  componentDidMount () {
    this.setState({
      content: this.props.content
    })
  }

  onChange = (e) => {
    this.setState({
      content: e.target.value
    })
    this.props.retrieveContent(e.target.value);
  }

  render () {
    return (
      <React.Fragment>
        {this.props.as == "TextArea"? 
        (<Form.TextArea label={this.props.label} onChange={this.onChange}
        value={this.state.content} 
        style={{
          height: "100px"
        }} />): 
        (this.props.as == "TextInput"? (<Form.Input label={this.props.label} 
          onChange={this.onChange}
        value={this.state.content} />): null)
        }
      </React.Fragment>
    );
  }
}

Field.propTypes = {
  content: PropTypes.string,
  label: PropTypes.string,
  retrieveContent: PropTypes.func,
  as: PropTypes.string
}

Field.defaultProps = {
  as: "TextInput"
}

export default Field
