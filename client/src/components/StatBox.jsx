import React from "react";

const StatBox = (props) => {
  return (
    <div className="bg-[#131b2e] p-8 rounded-xl flex flex-col items-center justify-center text-center">
      <p className="text-3xl font-black text-[#adc6ff] mb-1">
        {props.statNumber}
      </p>
      <p className="text-xs font-bold uppercase tracking-widest text-[#c2c6d6]">
        {props.statName}
      </p>
    </div>
  );
};
export default StatBox;
