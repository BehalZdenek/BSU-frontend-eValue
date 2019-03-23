import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, TableBody, TableHead, TableCell, TableRow, Paper } from "@material-ui/core";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutlineOutlined";
import Edit from "@material-ui/icons/EditOutlined";
import Info from "@material-ui/icons/InfoOutlined";
import Delete from "@material-ui/icons/DeleteOutlineOutlined";
import agent from "../../agent";
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
    state = {};

    handleInfoClick = (e, noticeId) => {
        e.preventDefault();
        const { history } = this.props;
        history.push("/main/detail", { noticeId: noticeId });
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
                            <Edit className="icon" />
                        </TableCell>
                        <TableCell className="del-col">
                            <Delete className="icon" />
                        </TableCell>
                    </TableRow>
                );
            });
        }
    };
    render() {
        return (
            <div className="content-wrapper">
                <h1>Seznam</h1>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow className="head">
                                <TableCell className="id-col">ID poznámky</TableCell>
                                <TableCell className="note-col">Poznámka</TableCell>
                                <TableCell className="detail-col">Detail poznámky</TableCell>
                                <TableCell className="edit-col">Editovat</TableCell>
                                <TableCell className="del-col">Smazat</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.generateTableBody()}
                            <TableRow className="row add-note">
                                <TableCell className="id-col">
                                    <AddCircleOutlined className="icon" />
                                </TableCell>
                                <TableCell className="note-col" colSpan={4}>
                                    Přidat poznámku
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage);
