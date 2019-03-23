import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import agent from "../../agent";
import { loadNotesList } from "../../duck/info";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    saveNotesToRedux: data => dispatch(loadNotesList(data))
});

class ListPage extends React.Component {
    componentDidMount() {
        const { saveNotesToRedux } = this.props;
        agent.Notes.getNotes().then(res => {
            Promise.all([saveNotesToRedux(res)]).then(() => {
                console.log("Data úspěšně zapsana do reduxu.");
            });
        });
    }
    state = {};
    render() {
        return (
            <div>
                <h1>Vítej!</h1>
                <p>Tady bude seznam</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage);
