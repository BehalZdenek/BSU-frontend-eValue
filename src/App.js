import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import store from "./store";
import Main from "./containers/Main";
//import "./App.css";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#607d8b"
        },
        secondary: {
            main: "#f44336"
        }
    },
    typography: {
        useNextVariants: true
    }
});

class App extends Component {
    render() {
        return (
            <div className="body">
                <MuiThemeProvider theme={theme}>
                    <Main />
                </MuiThemeProvider>
            </div>
        );
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
