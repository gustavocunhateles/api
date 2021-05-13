import React from "react";

const ApiOption = (props) => {
  return <option value={props.item}>{props.itemName}</option>;
};

export default ApiOption;