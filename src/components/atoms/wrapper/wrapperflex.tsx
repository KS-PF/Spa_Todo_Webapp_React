import React, { ReactNode } from 'react';


type Props = {
    children: ReactNode;
};

export const WrapperFlex: React.FC<Props> = ({children}) => {

    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        margin: "0 auto",
    }

    return (
        <div style={style}>
            { children }
        </div>
    );
};