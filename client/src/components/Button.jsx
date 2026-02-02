import React from "react";

function Button(props) {
  return (
    <button value={props.value} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
export default Button;
