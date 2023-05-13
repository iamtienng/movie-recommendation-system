// author: @iamtienng
// this component is used to display a box of input
import React from "react";

const SearchBox = (props) => {
  return (
    <div className="">
      <input
        className="form-control w-100 p-3"
        value={props.value}
        onChange={(event) => props.setSearch(event.target.value)}
        placeholder="Type to search.."
      ></input>
    </div>
  );
};

export default SearchBox;
