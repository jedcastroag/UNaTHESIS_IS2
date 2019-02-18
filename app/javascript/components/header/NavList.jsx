import React from "react"
import PropTypes from "prop-types"
import {Grid, List} from "semantic-ui-react";
import "../../../../dist/semantic.min.css";

class NavList extends React.Component {

    createItems = () => {
        let items = this.props.links.map((link) => <Grid.Column key={link[0]}>
            <List.Item as="a" href={link[1]}>{link[0]}</List.Item>
        </Grid.Column>);
        return items
    }

    render() {
        return (<Grid columns={this.props.links.length} divided>
                <Grid.Row>
                    {this.createItems()}
                </Grid.Row>

        </Grid>);
    }
}

NavList.propTypes = {
    links: PropTypes.array
};
export default NavList
