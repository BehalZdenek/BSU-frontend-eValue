import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ListPage, ListDetailPage, NotFound } from "./Pages";
import "../Less/global.less";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({});

class Main extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <Router basename="/">
                <div className="body">
                    <Switch>
                        <Route exact={true} path="/" component={ListPage} />
                        <Route exact={true} path="/main" component={ListPage} />
                        <Route exact={true} path="/main/detail" component={ListDetailPage} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
