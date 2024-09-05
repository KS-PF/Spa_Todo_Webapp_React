import React, { ReactNode } from 'react';


type Props = {
    width?: string,
    margin?: string,
    textAlign?: React.CSSProperties['textAlign'],
    children: ReactNode;
};

export const Wrapper: React.FC<Props> = (props) => {
    const { 
        width = "100%",
        margin = "0",
        textAlign = "center",
        children,
    } = props;

    const style = {
        width,
        margin,
        textAlign: textAlign,
        overflow: "hidden",
    }

    return (
        <div style={style}>
            { children }
        </div>
    );
};