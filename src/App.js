import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import store from "./store";
import "./App.css";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class App extends Component {
    render() {
        return <div>My page</div>;
    }
}

const ConnectedRoot = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default () => (
    <Provider store={store}>
        <ConnectedRoot />
    </Provider>
);
