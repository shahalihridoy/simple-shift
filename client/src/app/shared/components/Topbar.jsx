import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Icon, IconButton, Input, Badge, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import {
  mobileSidenav,
  closeSidenav,
  fullSidenav
} from "../../redux/actions/LayoutActions";
import { PropTypes } from "prop-types";
import CustomizedMenu from "./CustomizedMenu";
import { isMobile } from "../../../Utils";
import SearchBox from "./SearchBox";
import { setUser } from "../../redux/actions/AuthActions";
import { signOut } from "../../views/sessions/SessionService";

class Topbar extends Component {
  state = {
    showSearchBox: false
  };

  handleMenuClick = () => {
    let { closeSidenav, mobileSidenav, fullSidenav, sidenav } = this.props;
    if (isMobile()) {
      sidenav === "close" ? mobileSidenav() : closeSidenav();
    } else {
      sidenav === "full" ? closeSidenav() : fullSidenav();
    }
  };

  handleSignOut = () => {
    signOut().then(() => {
      localStorage.removeItem("authenticated");
      this.props.history.push("/session/signin");
    });
  };

  handleSearchClick = () => {
    this.setState({ showSearchBox: !this.state.showSearchBox });
  };

  componentWillReceiveProps(props) {}

  render() {
    return (
      <div className="topbar p-sm-30">
        <div className="topbar-hold">
          {this.state.showSearchBox ? (
            <SearchBox onSearchButtonClick={this.handleSearchClick} />
          ) : (
            <div className="flex flex-space-between flex-middle h-100">
              <div className="flex">
                <IconButton onClick={this.handleMenuClick}>
                  <Icon>menu</Icon>
                </IconButton>
              </div>
              <div className="flex flex-middle">
                <IconButton onClick={this.handleSearchClick}>
                  <Icon>search</Icon>
                </IconButton>

                <CustomizedMenu
                  menuButton={
                    <img
                      className="mx-8 text-middle circular-image-small cursor-pointer"
                      src="/assets/images/face-7.jpg"
                      alt="user"
                    />
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
                    onClick={this.handleSignOut}
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> power_settings_new </Icon>
                    <span className="pl-16"> Logout </span>
                  </div>
                </CustomizedMenu>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
  closeSidenav: PropTypes.func.isRequired,
  fullSidenav: PropTypes.func.isRequired,
  mobileSidenav: PropTypes.func.isRequired,
  sidenav: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sidenav: state.layout.sidenav,
  user: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { mobileSidenav, closeSidenav, fullSidenav, setUser }
  )(Topbar)
);
