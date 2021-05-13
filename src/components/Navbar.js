import React from "react";
import "../sass/Navbar.scss";

const Navbar = (props) => {

    return (
      <nav>
        <div className={props.classeNameDiv}> 
          <h1>{props.itemH1}</h1>
          <strong>{props.itemStrong1}</strong>
          <strong>{props.itemStrong2}</strong>
          <br></br> 
          <p className={props.classeNameP}>   
            <strong>{props.itemStrong3}</strong>  
            <select id={props.idSelect} className={props.classeNameSelect} onChange={props.funSelect}>
              {props.op0}
              {props.op1}
              {props.op2}
              {props.op3}
              {props.op4}
              {props.op5}
            </select>
          </p>
        </div>
      </nav>
    );
  };

export default Navbar;
