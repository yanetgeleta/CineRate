import React from "react";

const ComboBox = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <select
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        name={props.name}
        id={props.name}
      >
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option.query}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ComboBox;
