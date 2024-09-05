import React, { memo } from "react";
import { Link } from "react-router-dom";
import classes from "./customAnchor1.module.css";


type Props = {
    children: string,
    color?: string,
    fontSize?: string,
    fontWeight?: string,
    margin?: string,
    to: string,
    textDecoration?: string
};

export const CustomAnchor1: React.FC<Props> = memo((props) => {
    const { 
        children, 
        color = 'rgb(84, 84, 84)', 
        fontSize = '16PX', 
        margin = "0",
        textDecoration = 'none',
        to,
    } = props;

    const style = {
        color,
        fontSize,
        margin,
        textDecoration,
    }

    return (
        <Link to={to}  className={classes.link} style={style}>
            { children }
        </Link>
    );
});