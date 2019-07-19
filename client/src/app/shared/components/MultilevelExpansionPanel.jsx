import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withStyles, Icon } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase";
import CustomExpansionPanel from "./CustomExpansionPanel";

const styles = theme => ({
  expandIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(90deg)"
  },
  collapseIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(0deg)"
  }
});

class MultilevelExpansionPanel extends Component {
  state = {
    collapsed: true
  };

  renderLevels = data => {
    let { onNavigationClick } = this.props;

    return data.map((item, index) => {
      if (item.children) {
        return (
          <CustomExpansionPanel
            icon={item.icon}
            levelName={item.name}
            key={index}
          >
            {this.renderLevels(item.children)}
          </CustomExpansionPanel>
        );
      } else {
        return (
          <NavLink
            onClick={onNavigationClick}
            key={index}
            to={item.path}
            className="nav-item"
          >
            <TouchRipple key={item.name} name="child" className="w-100">
              {(() => {
                if (item.icon) {
                  return (
                    <Icon className="item-icon text-middle">{item.icon}</Icon>
                  );
                } else {
                  return (
                    <span className="item-icon icon-text">{item.iconText}</span>
                  );
                }
              })()}
              {/* <Icon className="text-middle">{item.icon}</Icon> */}
              <span className="text-middle pl-20 item-text">{item.name}</span>
            </TouchRipple>
          </NavLink>
        );
      }
    });
  };

  handleClick = () => {
    let { collapsed } = this.state;
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return this.renderLevels(this.props.data);
  }
}

export default withStyles(styles)(MultilevelExpansionPanel);
