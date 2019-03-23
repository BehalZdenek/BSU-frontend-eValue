import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({});

class ListDetailPage extends React.Component {
    componentDidMount() {}
    state = {};
    render() {
        return (
            <div>
                <h1>Vítej!</h1>
                <p>Tady bude detail seznamu</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListDetailPage);
