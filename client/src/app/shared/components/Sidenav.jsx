import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Switch, Icon } from "@material-ui/core";
import { connect } from "react-redux";
import {
  fullSidenav,
  closeSidenav,
  compactSidenav,
  mobileSidenav
} from "../../redux/actions/LayoutActions";
import { Data } from "./Data";
import CustomizedMenu from "./CustomizedMenu";
import { isMobile } from "../../../Utils";
import { setUser } from "../../redux/actions/AuthActions";
import { withRouter } from "react-router-dom";
import MultilevelExpansionPanel from "./MultilevelExpansionPanel";
import { signOut } from "../../views/sessions/SessionService";

class Sidenav extends Component {
  state = {
    sidenavToggleChecked: false,
    userImage: "/assets/images/face-7.jpg",
    displayName: ""
  };

  componentWillReceiveProps({ sidenav, user }) {
    if (sidenav === "full" && !isMobile())
      this.setState({
        sidenavToggleChecked: false,
        userImage: user.photoUrl,
        displayName: user.name
      });
    else this.setState({ userImage: user.photoUrl, displayName: user.name });
  }

  handleSidenavToggle = () => {
    let { sidenavToggleChecked } = this.state;
    if (sidenavToggleChecked) this.props.fullSidenav();
    else this.props.compactSidenav();
    this.setState({ sidenavToggleChecked: !sidenavToggleChecked });
  };

  handleSignOut = () => {
    signOut().then(() => {
      localStorage.removeItem("authenticated");
      this.props.history.push("/session/signin");
    });
  };

  handleNavigationClick = () => {
    if (isMobile()) this.props.closeSidenav();
  };

  renderEgretIconWithSwitch = () => (
    <div className="flex flex-middle flex-space-between brand-area">
      <div className="flex flex-middle brand">
        <img src="/assets/images/logo.png" alt="company-logo" />
        <span className="brand__text">Shift Simple</span>
      </div>
      <Switch
        className="sidenav__toggle hide-on-mobile"
        onChange={this.handleSidenavToggle}
        checked={this.state.sidenavToggleChecked}
        color="secondary"
      />
    </div>
  );

  renderMultilevelMenu = () => (
    <Fragment>
      <CustomizedMenu
        menuButton={
          <div className="flex flex-middle py-8 my-8 cursor-pointer sidenav__user h-70">
            <div className="flex flex-middle">
              <img src={this.state.userImage} alt="user" />
              <span className="px-20">{this.state.displayName}</span>
            </div>
            <Icon>arrow_drop_down</Icon>
          </div>
        }
      >
        <div className="flex flex-middle" style={{ minWidth: 185 }}>
          <Icon> home </Icon>
          <span className="pl-16"> Home </span>
        </div>
        <div className="flex flex-middle" style={{ minWidth: 185 }}>
          <Icon> person </Icon>
          <span className="pl-16"> Person </span>
        </div>
        <div className="flex flex-middle" style={{ minWidth: 185 }}>
          <Icon> settings </Icon>
          <span className="pl-16"> Settings </span>
        </div>
        <div
          onClick={() => this.handleSignOut()}
          className="flex flex-middle"
          style={{ minWidth: 185 }}
        >
          <Icon> power_settings_new </Icon>
          <span className="pl-16"> Logout </span>
        </div>
      </CustomizedMenu>
      <div className="navigation">
        <MultilevelExpansionPanel
          onNavigationClick={this.handleNavigationClick}
          data={Data}
        />
      </div>
    </Fragment>
  );

  render() {
    return (
      <div className="sidenav">
        <div className="sidenav__hold">
          {this.renderEgretIconWithSwitch()}
          <PerfectScrollbar className="scrollable h-100 mt-8 position-relative">
            {this.renderMultilevelMenu()}
          </PerfectScrollbar>
          <div onClick={this.props.closeSidenav} className="sidenav__overlay" />
        </div>
      </div>
    );
  }
}

Sidenav.propTypes = {
  closeSidenav: PropTypes.func.isRequired,
  fullSidenav: PropTypes.func.isRequired,
  compactSidenav: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  sidenav: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  sidenav: state.layout.sidenav,
  user: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { mobileSidenav, closeSidenav, fullSidenav, compactSidenav, setUser }
  )(Sidenav)
);
