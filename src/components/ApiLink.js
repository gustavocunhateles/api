import React from "react";

const ApiLink = (props) => {
  return <a href={props.link} title={props.title}>{props.linkName}</a>;
};

export default ApiLink;
