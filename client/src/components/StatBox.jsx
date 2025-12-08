import React from "react";

const StatBox = (props)=> {
    return (
        <div>
            <p>{props.statNumber}</p>
            <p>{props.statName}</p>
        </div>
    )
}
export default StatBox;