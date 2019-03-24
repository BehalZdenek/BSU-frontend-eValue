import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import querystring from "query-string";
import { TextField, Paper, FormGroup, Button } from "@material-ui/core";
import agent from "../../agent";
import { translation } from "../../translation";
import { loadNotesList } from "../../duck/notes";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    saveNotesToRedux: data => dispatch(loadNotesList(data))
});

class EditNote extends React.Component {
    componentDidMount() {
        const { editNote } = this.props;
        this.setState({ noteToEdit: editNote.title });
    }
    state = { noteToEdit: "" };
    handleModalClose = () => {
        const { closeModal } = this.props;
        closeModal();
    };
    handleSendClick = e => {
        e.preventDefault();
        const { notes, saveNotesToRedux, editNote } = this.props;
        let notesCopy = notes && notes.allNotes;
        const bodyToSend = Object.create({ title: this.state.noteToEdit }, {});
        agent.Notes.updateNote(editNote.id, querystring.stringify(bodyToSend)).then(res => {
            for (let i = 0; i < notesCopy.length; i++) {
                if (notesCopy[i].id === editNote.id) {
                    notesCopy[i] = res;
                }
            }
            Promise.all([saveNotesToRedux(notesCopy)]).then(() => {
                this.handleModalClose();
            });
        });
    };
    handleWriting = e => {
        this.setState({ noteToEdit: e.target.value });
    };
    render() {
        const { localization } = this.props;
        const translationToUse = translation.localization[localization];
        return (
            <div className="modal-wrapper">
                <Paper className="modal-paper">
                    <p className="modal-headline">{translationToUse.editModal.headline}</p>
                    <FormGroup className="text-field-wrap">
                        <TextField
                            value={this.state.noteToEdit}
                            variant="outlined"
                            margin="dense"
                            onChange={e => {
                                this.handleWriting(e);
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="buttons-wrap">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={e => {
                                this.handleSendClick(e);
                            }}
                        >
                            {translationToUse.editModal.editButton}
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={e => {
                                this.handleModalClose(e);
                            }}
                        >
                            {translationToUse.editModal.cancelButton}
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
)(EditNote);
