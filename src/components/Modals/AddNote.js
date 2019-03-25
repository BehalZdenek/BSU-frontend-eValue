import React from "react";
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

class AddNote extends React.Component {
    componentDidMount() {}
    state = { noteToAdd: "" };
    handleModalClose = e => {
        const { closeModal } = this.props;
        closeModal(e);
    };
    handleSendClick = e => {
        e.preventDefault();
        const { notes, saveNotesToRedux } = this.props;
        let notesCopy = notes && notes.allNotes;
        const bodyToSend = Object.create({ title: this.state.noteToAdd }, {});
        agent.Notes.addNote(querystring.stringify(bodyToSend)).then(res => {
            notesCopy.push(res);
            Promise.all([saveNotesToRedux(notesCopy)]).then(() => {
                this.handleModalClose();
            });
        });
    };
    handleWriting = e => {
        this.setState({ noteToAdd: e.target.value });
    };
    render() {
        const { localization } = this.props;
        const currLang = localization && localization.localization;
        const translationToUse = translation.localization[currLang];
        return (
            <div className="modal-wrapper">
                <Paper className="modal-paper">
                    <p className="modal-headline">{translationToUse.addModal.headline}</p>
                    <FormGroup className="text-field-wrap">
                        <TextField
                            value={this.state.noteToAdd}
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
                            {translationToUse.addModal.addButton}
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={e => {
                                this.handleModalClose(e);
                            }}
                        >
                            {translationToUse.addModal.cancelButton}
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
)(AddNote);
