import React, { ChangeEvent, memo } from "react";
import classes from "./loginInputText.module.css";
import { InputText } from "../../../atoms/input/text/inputText";
import { validateLengthMessage } from "../../validation/formValidations";


type Props = {
    placeholder?: string,
    label: string,
    type?:string,
    min?: number,
    max?: number,
    inputValue: string,
    setInputValue: (value: string) => void,
    is_need_message?: boolean
}


export const LoginInputText: React.FC<Props> = memo((props) => {
    const { 
        placeholder = "",
        label, 
        min = 8, max = 128, 
        inputValue, 
        setInputValue, 
        type,
        is_need_message = true 
    } = props;

    const [length, setLength] = React.useState<number>(0);
    const [message, setMessage] = React.useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        setInputValue(newText);
        setLength(newText.length);
        setMessage(validateLengthMessage(newText, min, max));
    };

    return (
        <div>
            <label className={classes.label}>{ label }</label>
            { is_need_message ? (
                <>
                    <br />
                    <span className={classes.inputTextCount}> 
                        現在 {length}文字です。{message}
                    </span>
                </>
            ) : (
                <span></span>
            )}
        
            <InputText 
                value={inputValue}
                placeholder={placeholder} 
                onChange={handleChange}
                type={type}
                minLength={min}
                maxLength={max}
                width="90%"
                margin="0 0 16px 0"
            />
        </div>
    );
});