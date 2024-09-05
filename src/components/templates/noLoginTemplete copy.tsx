import React, { ReactNode } from 'react';
import classes from "./baseTemplete.module.css";
import { CssHeight } from '../atoms/css/cssHeight';
import { FooterOrganism } from '../organisms/Footer/footerOrganism';


type Props = {
    children: ReactNode;
};

export const NoLoginTemplete: React.FC<Props> = ({ children }) => {

    return (
        <>
            <CssHeight height='28px' />

            <div className={classes.centeredDiv}>
                {children}
            </div>

            <CssHeight height='64px' />

            <FooterOrganism />
        </>
    );
};