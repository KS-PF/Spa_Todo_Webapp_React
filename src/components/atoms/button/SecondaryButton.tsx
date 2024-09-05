import classes from "./SecondaryButton.module.css";
import base from "./BaseButton.module.css";
import { memo } from "react";

type Props = {
    children: string,
    onClick?: () => void
};

export const SecondaryButton = memo((props:Props) => {
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