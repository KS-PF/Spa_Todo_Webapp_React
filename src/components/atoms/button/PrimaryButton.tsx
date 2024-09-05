import React, { memo } from "react";
import classes from "./PrimaryButton.module.css";
import base from "./BaseButton.module.css";

type Props = {
    children: string,
    onClick?: () => void
};

export const PrimaryButton: React.FC<Props> = memo((props) => {
    const { children, onClick } = props;

    return (
        <button 
            className={`${base.button} ${classes.button}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
});