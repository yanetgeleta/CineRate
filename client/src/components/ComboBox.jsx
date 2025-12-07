import React from "react";

const ComboBox = (props)=> {
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <select name={props.name} id={props.name}>
                {
                    props.options.map((sort, index)=> {
                        return (
                            <option key={index} value={sort} >{sort}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default ComboBox;