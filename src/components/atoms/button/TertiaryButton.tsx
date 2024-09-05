import classes from "./TertiaryButton.module.css";
import base from "./BaseButton.module.css";
import { memo } from "react";

type Props = {
    children: string,
    onClick?: () => void
};

export const TertiaryButton = memo((props:Props) => {
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