import React, { memo } from "react";


type Props = {
    children: string,
    color?: string,
    fontSize: string,
    fontWeight?: string,
    margin?: string,
    width?: string,
    textAlign?: React.CSSProperties['textAlign'],
};

export const CustomParagraph1: React.FC<Props> = memo((props) => {
    const { 
        children, 
        color = 'rgb(84, 84, 84)',
        width = '100%', 
        fontSize, 
        fontWeight, 
        margin = "0",
        textAlign = "center",
    } = props;

    const style = {
        color,
        fontSize,
        fontWeight,
        width,
        margin,
        textAlign: textAlign,
    }

    return (
        <p style={style}>
            {children}
        </p>
    );
});