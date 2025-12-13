import React from "react";

const YearList = (props)=> {
    const currentYear = props.currentYear;
    const earliestYear = props.earliestYear;
    const yearsCount = currentYear - earliestYear + 1;

    return (
        <div>
            <label htmlFor="year-select">{props.label}</label>
            <select name="year-select" id="year-select">
                {Array.from({length: yearsCount}, (_, index)=> {
                    const year = earliestYear + index;
                    return(
                        <option key={year} value={year}>{year}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default YearList;