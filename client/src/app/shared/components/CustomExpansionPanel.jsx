import React, { Component } from "react";
import TouchRipple from "@material-ui/core/ButtonBase";
import { withStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";

const styles = theme => {
  return {
    expandIcon: {
      transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
      transform: "rotate(90deg)",
      marginRight: "16px"
    },
    collapseIcon: {
      transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
      transform: "rotate(0deg)",
      marginRight: "16px"
    },
    "expansion-panel": {
      overflow: "hidden",
      transition: "max-height 0.3s cubic-bezier(0, 0, 0.2, 1)"
    },
    highlight: {
      background: theme.palette.primary.main
    }
  };
};

class CustomExpansionPanel extends Component {
  state = {
    collapsed: true
  };
  heightRef = React.createRef();
  componentHeight = 0;

  handleClick = () => {
    let { collapsed } = this.state;
    this.setState({ collapsed: !this.state.collapsed });
  };

  calcaulateHeight(node) {
    if (node.name !== "child") {
      for (let child of node.children) {
        this.calcaulateHeight(child);
      }
    }
    this.componentHeight += node.clientHeight;
    return;
  }
  componentDidMount() {
    this.calcaulateHeight(this.heightRef);
  }
  render() {
    let { collapsed } = this.state;
    let { classes, children, levelName, icon } = this.props;
    return (
      <div>
        <TouchRipple
          className="nav-item flex-middle h-48 w-100"
          onClick={this.handleClick}
        >
          <div>
            <Icon className="text-middle">{icon}</Icon>
            <span className="text-middle pl-20 item-text">{levelName}</span>
          </div>
          <div
            className={
              collapsed
                ? classes.collapseIcon + " item-arrow"
                : classes.expandIcon + " item-arrow"
            }
          >
            <Icon className="text-middle">chevron_right</Icon>
          </div>
        </TouchRipple>

        <div
          ref={el => (this.heightRef = el)}
          className={classes["expansion-panel"]}
          style={
            collapsed
              ? { maxHeight: "0px" }
              : { maxHeight: this.componentHeight + "px" }
          }
        >
          {children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CustomExpansionPanel);
