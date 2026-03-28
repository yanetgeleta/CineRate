import React from "react";

const ComboBox = (props) => {
  return (
    <div>
      <label htmlFor={props.name} className="text-sm font-medium">
        {props.label}
      </label>
      <div class="flex flex-col gap-2 pt-3">
        <select
          className="form-select w-full h-6 rounded-lg text-sm focus:border-[#2513ec] focus:ring-[#2513ec] border-slate-700 bg-slate-800"
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
          name={props.name}
          id={props.name}
          value={props.currentValue || ""}
        >
          {props.options.map((option, index) => {
            return (
              <option hidden={option.hidden} key={index} value={option.query}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default ComboBox;
