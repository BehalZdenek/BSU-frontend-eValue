import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import agent from "../../agent";
import { translation } from "../../translation";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({});

class ListDetailPage extends React.Component {
    componentDidMount() {
        const { location } = this.props;
        const detailId = location && location.state && location.state.noticeId;
        agent.Notes.getNote(detailId).then(res => {
            this.setState({ notice: res });
        });
    }
    handleGoBackClick = e => {
        e.preventDefault();
        const { history } = this.props;
        history.goBack();
    };
    state = { notice: {} };
    render() {
        const { location } = this.props;
        const currPath = location && location.pathname;
        let localization = "";
        if (currPath === "/main/detail/en") {
            localization = "en";
        } else {
            localization = "cz";
        }
        const translationToUse = translation.localization[localization];
        return (
            <div className="content-wrapper">
                <div className="page-header">
                    <h1>{translationToUse.detailPageHeadline}</h1>
                    <p
                        className="link"
                        onClick={e => {
                            this.handleGoBackClick(e);
                        }}
                    >
                        {translationToUse.detailPageLink}
                    </p>
                </div>

                <Paper className="detail-paper">
                    <p>{this.state.notice.title}</p>
                </Paper>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListDetailPage);
