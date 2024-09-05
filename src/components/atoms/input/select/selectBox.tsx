import React from "react";
import classes from "./selectBox.module.css";

type Option = {
    value: string | number;
    label: string;
};

type Props = {
    selectValue: string | number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    options: Option[];
    fontSize?: string,
    width?: string,
};

export const SelectBox: React.FC<Props> = (props) => {
    const { 
        selectValue, onChange, options,
        fontSize = "22px",
        width = "fit-content",
    } = props;

    const style = {
        fontSize,
        width,
    }

    return (
        <select 
            className={classes.select} 
            value={selectValue} 
            onChange={onChange}
            style={style}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

//  <SelectBox 
//    selectValue={selectValue} 
//    onChange={handleSelectChange} 
//    options={options} 
//  />

//  const options = [
//      { value: "1", label: "低い" },
//      { value: "2", label: "普通" },
//      { value: "3", label: "高い" },
//      { value: "4", label: "緊急" },
//  ];