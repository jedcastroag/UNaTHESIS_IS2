import React from "react"
import PropTypes from "prop-types"
import {Segment} from "semantic-ui-react"

class LiTag extends React.Component {
  render () {
    return (
      <a href = {this.props.path}>
        {this.props.linkTitle}
      </a>
    );
  }
}

LiTag.propTypes = {
  linkTitle: PropTypes.string,
  path: PropTypes.string
};
export default LiTag
