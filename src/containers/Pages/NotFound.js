import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({});

class NotFound extends React.Component {
    componentDidMount() {}
    state = {};
    render() {
        return (
            <div>
                <h1>Not found :-(</h1>
                <p>Chyba 404 - stránka nenalezena.</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotFound);
