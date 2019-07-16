import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TouchRipple from "@material-ui/core/ButtonBase";
import { Icon } from "@material-ui/core";

const SidenavUserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <TouchRipple
        className="flex-start px-16 py-8 my-8 w-100"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div className="flex flex-middle sidenav__user">
          <img src="./assets/images/face-7.jpg" alt="user" />
          <span className="px-16">John Doe</span>
        </div>
        <Icon>arrow_drop_down</Icon>
      </TouchRipple>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default SidenavUserMenu;
