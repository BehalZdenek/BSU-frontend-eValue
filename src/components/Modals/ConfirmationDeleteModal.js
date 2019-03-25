import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Paper, FormGroup, Button } from "@material-ui/core";
import { translation } from "../../translation";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({});

class ConfirmationDeleteModal extends React.Component {
    componentDidMount() {}
    handleModalClose = () => {
        const { closeModal } = this.props;
        closeModal();
    };
    handleSubmitClick = e => {
        e.preventDefault();
        const { submitAction, note, closeModal } = this.props;
        submitAction(e, note.id);
        closeModal();
    };
    render() {
        const { localization, note } = this.props;
        const translationToUse = translation.localization[localization];
        return (
            <div className="modal-wrapper">
                <Paper className="modal-paper">
                    <p className="modal-headline">
                        {translationToUse.confirmationDelModal.headline}
                        {note.id}
                    </p>
                    <FormGroup className="buttons-wrap center">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={e => {
                                this.handleSubmitClick(e, note.id);
                            }}
                        >
                            {translationToUse.confirmationDelModal.submitButton}
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={e => {
                                this.handleModalClose(e);
                            }}
                        >
                            {translationToUse.confirmationDelModal.cancelButton}
                        </Button>
                    </FormGroup>
                </Paper>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmationDeleteModal);
