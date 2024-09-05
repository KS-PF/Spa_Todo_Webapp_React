import React, { memo } from "react";
import classes from "./inputText.module.css";


type Props = {
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    type?:string,
    placeholder?: string,
    minLength?: number,
    maxLength?: number,
    height?: string,
    width?: string; 
    margin?: string,
};

export const InputText: React.FC<Props> = memo((props) => {
    const { 
        value,
        placeholder,
        onChange,
        type = "text",
        minLength = 8,
        maxLength = 48,
        height = "34px",
        width = "100%",
        margin = "0",
    } = props;

    const style = {
        margin,
        height,
        width,
    }

    return (
        <input 
            type={type}
            style={style} 
            className={classes.inputTextCss}
            value={value}
            placeholder={placeholder} 
            onChange={onChange} 
            minLength={minLength}
            maxLength={maxLength}
            required={true}
        />
    );
});