import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mobileSidenav,
  closeSidenav,
  fullSidenav
} from "../../../../redux/actions/LayoutActions";

import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { isMobile } from "../../../../../Utils";
import { renderRoutes } from "react-router-config";
import Topbar from "../../Topbar";
import Sidenav from "../../Sidenav";
import Footer from "../../Footer";

class AdminLayout extends Component {
  componentWillMount() {
    let { closeSidenav, mobileSidenav, fullSidenav } = this.props;
    if (isMobile()) {
      closeSidenav();
    }

    window.addEventListener("resize", this.listenWindowResize);
  }

  listenWindowResize = () => {
    if (isMobile()) {
      this.props.closeSidenav();
    } else {
      this.props.fullSidenav();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.listenWindowResize);
  }

  render() {
    let { sidenav } = this.props;
    let mainClass = "sidenav-" + sidenav + " flex";
    return (
      <div className={mainClass}>
        <Sidenav />

        <div className="container position-relative">
          <Topbar />

          <PerfectScrollbar className="scrollable-content">
            <div className="content mx-sm-30">
              {renderRoutes(this.props.route.routes)}
            </div>
            <Footer />
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}

AdminLayout.propTypes = {
  sidenav: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  closeSidenav: PropTypes.func.isRequired,
  fullSidenav: PropTypes.func.isRequired,
  mobileSidenav: PropTypes.func.isRequired,
  sidenav: state.layout.sidenav
});

export default connect(
  mapStateToProps,
  { closeSidenav, fullSidenav, mobileSidenav }
)(AdminLayout);
