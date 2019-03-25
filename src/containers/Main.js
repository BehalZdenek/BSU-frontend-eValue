import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ListPage, ListDetailPage } from "./Pages";
import PropTypes from "prop-types";
import "../Sass/global.scss";
import { changeLocalizationCZ, changeLocalizationEN } from "../duck/localization";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    changeLocalizationToCZ: () => dispatch(changeLocalizationCZ()),
    changeLocalizationToEN: () => dispatch(changeLocalizationEN())
});
class Main extends React.Component {
    componentDidMount() {}
    render() {
        const { localization, changeLocalizationToCZ, changeLocalizationToEN } = this.props;
        const currLoc = localization.localization;
        return (
            <Router basename="/" ref={router => (this.router = router)}>
                <div className="languages-switch">
                    <p
                        className={currLoc === "cz" ? "link cz active" : "link cz"}
                        onClick={() => {
                            Promise.all([changeLocalizationToCZ("cz")]);
                        }}
                    >
                        CZ
                    </p>
                    <p
                        className={currLoc === "en" ? "link en active" : "link en"}
                        onClick={() => {
                            Promise.all([changeLocalizationToEN("en")]);
                        }}
                    >
                        EN
                    </p>
                </div>
                <div>
                    <Switch>
                        <Route exact={true} path="/" component={ListPage} />
                        <Route exact={true} path="/main" component={ListPage} />
                        <Route exact={true} path="/main/detail" component={ListDetailPage} />
                        <Route component={ListPage} />
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
