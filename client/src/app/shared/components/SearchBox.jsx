import React from "react";
import { Icon, IconButton } from "@material-ui/core";

const SearchBox = ({ onSearchButtonClick }) => {
  return (
    <div className="flex flex-middle h-100 position-relative">
      <input className="px-16 search-box w-100" type="text" />
      <IconButton onClick={onSearchButtonClick} className="text-middle mx-4">
        <Icon>close</Icon>
      </IconButton>
    </div>
  );
};

export default SearchBox;
