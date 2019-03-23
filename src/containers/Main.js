import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ListPage, ListDetailPage, NotFound } from "./Pages";
import PropTypes from "prop-types";
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
                <div>
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

Main.defaultProps = {
    nav: {
        active: true, // start with nav active
        enabled: true, // start with nav disabled
        responsive: "multiple"
    }
    //session: { name: 'guest' }
};

Main.propTypes = {
    nav: PropTypes.shape({
        active: PropTypes.bool,
        enabled: PropTypes.bool,
        responsive: PropTypes.string
    })
    //session: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
