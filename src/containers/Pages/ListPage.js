import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, Modal, DialogContent } from "@material-ui/core";
import { AddNote, EditNote, ConfirmationDeleteModal } from "../../components/Modals";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutlineOutlined";
import Edit from "@material-ui/icons/EditOutlined";
import Info from "@material-ui/icons/InfoOutlined";
import Delete from "@material-ui/icons/DeleteOutlineOutlined";
import agent from "../../agent";
import { translation } from "../../translation";
import { loadNotesList } from "../../duck/notes";
import "../../Sass/table.scss";

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
            Promise.all([saveNotesToRedux(res)]);
        });
    }
    state = { addNote: false, editNote: false, confDelNote: false };
    handleAddModalOpen = e => {
        e.preventDefault();
        this.setState({ addNote: true });
    };
    handleAddModalClose = () => {
        this.setState({ addNote: false });
    };
    handleConfDelModalOpen = (e, note) => {
        e.preventDefault();
        this.setState({ confDelNote: true, noteToDel: note });
    };
    handleConfDelModalClose = () => {
        this.setState({ confDelNote: false });
    };
    handleInfoClick = (e, noteId) => {
        e.preventDefault();
        const { history, location } = this.props;
        switch (location.pathname) {
            case "/main/en":
                history.push("/main/detail/en", { noticeId: noteId });
                break;
            default:
                history.push("/main/detail", { noticeId: noteId });
        }
    };
    handleNoteDelClick = (e, noteId) => {
        const { notes, saveNotesToRedux } = this.props;
        let notesCopy = notes && notes.allNotes;
        e.preventDefault();
        agent.Notes.deleteNote(noteId).then(res => {
            //console.log("res", res);
            for (let i = 0; i < notesCopy.length; i++) {
                if (notesCopy[i].id === noteId) {
                    notesCopy.splice(i, 1);
                }
            }
            Promise.all([saveNotesToRedux(notesCopy)]);
        });
    };
    handleEditModalOpen = (e, noteToEdit) => {
        e.preventDefault();
        this.setState({ editNote: true, noteToEdit: noteToEdit });
    };
    handleEditModalClose = () => {
        this.setState({ editNote: false });
    };
    generateTableBody = () => {
        const { notes } = this.props;
        const allNotes = notes && notes.allNotes;
        if (allNotes) {
            return allNotes.map((row, index) => {
                return (
                    <TableRow key={`row-${row.id}`} className="row">
                        <TableCell className="id-col">{row.id}</TableCell>
                        <TableCell className="note-col">{row.title}</TableCell>
                        <TableCell className="detail-col">
                            <Info
                                className="icon"
                                onClick={e => {
                                    this.handleInfoClick(e, row.id);
                                }}
                            />
                        </TableCell>
                        <TableCell className="edit-col">
                            <Edit
                                className="icon"
                                onClick={e => {
                                    this.handleEditModalOpen(e, row);
                                }}
                            />
                        </TableCell>
                        <TableCell className="del-col">
                            <Delete
                                className="icon"
                                onClick={e => {
                                    this.handleConfDelModalOpen(e, row);
                                }}
                            />
                        </TableCell>
                    </TableRow>
                );
            });
        }
    };
    render() {
        const { location } = this.props;
        const currPath = location && location.pathname;
        let localization = "";
        if (currPath === "/main/en") {
            localization = "en";
        } else {
            localization = "cz";
        }
        const translationToUse = translation.localization[localization];

        return (
            <div className="content-wrapper">
                <h1>{translationToUse.mainPageHeadline}</h1>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow className="head">
                                <TableCell className="id-col">{translationToUse.table.headerId}</TableCell>
                                <TableCell className="note-col">{translationToUse.table.headerNote}</TableCell>
                                <TableCell className="detail-col">{translationToUse.table.headerDetail}</TableCell>
                                <TableCell className="edit-col">{translationToUse.table.headerEdit}</TableCell>
                                <TableCell className="del-col">{translationToUse.table.headerDelete}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.generateTableBody()}
                            <TableRow
                                className="row add-note"
                                onClick={e => {
                                    this.handleAddModalOpen(e);
                                }}
                            >
                                <TableCell className="id-col">
                                    <AddCircleOutlined className="icon" />
                                </TableCell>
                                <TableCell className="note-col" colSpan={4}>
                                    {translationToUse.table.addNote}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Modal open={this.state.addNote} onClose={this.handleAddModalClose}>
                    <DialogContent>
                        <AddNote localization={localization} closeModal={this.handleAddModalClose} />
                    </DialogContent>
                </Modal>
                <Modal open={this.state.editNote} onClose={this.handleEditModalClose}>
                    <DialogContent>
                        <EditNote localization={localization} editNote={this.state.noteToEdit} closeModal={this.handleEditModalClose} />
                    </DialogContent>
                </Modal>
                <Modal open={this.state.confDelNote} onClose={this.handleConfDelModalClose}>
                    <DialogContent>
                        <ConfirmationDeleteModal
                            localization={localization}
                            note={this.state.noteToDel}
                            submitAction={(e, noteId) => {
                                this.handleNoteDelClick(e, noteId);
                            }}
                            closeModal={this.handleConfDelModalClose}
                        />
                    </DialogContent>
                </Modal>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage);
