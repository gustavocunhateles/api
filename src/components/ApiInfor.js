import React from "react";
import "../sass/Navbar.scss";
//import ApiItem from "./ApiItem";

const ApiInfor = (props) => {

    return (
      <nav>
        <div className={props.classeNameDiv}>  
            {props.item1}
            {props.item2}
            {props.item3}
            {props.item4}
            {props.item5}
            {props.item6}
            {props.item7}
            {props.item8}
            {props.item9}
            {props.item10}
            {props.item11}
            {props.item12}
        </div>
      </nav>
    );
  };

export default ApiInfor;
