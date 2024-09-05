import React, { ReactNode } from 'react';
import classes from "./baseTemplete.module.css";
import { getUserFromSessionStorage } from '../../sessionStorage/userSessionStorage';
import { CssHeight } from '../atoms/css/cssHeight';
import { HeaderOrganism } from '../organisms/Header/headerOrganism';
import { FooterOrganism } from '../organisms/Footer/footerOrganism';
import { CustomParagraph1 } from '../atoms/p/customParagraph1';
import { SecondaryButton } from '../atoms/button/SecondaryButton';
import { useNavigate } from 'react-router-dom';


type Props = {
    children: ReactNode;
};

export const MainTemplete: React.FC<Props> = ({ children }) => {
    const retrievedUser = getUserFromSessionStorage();
    const navigate = useNavigate();
    const onClickGoLogin = () => {
        navigate('/login')
    };

    return (
        <>
            {
                retrievedUser.is_login ? (
                    <>
                        <HeaderOrganism />
                        <CssHeight height='4px' />
                        <div className={classes.centeredDiv}>
                            {children}
                        </div>
                    </>
                ) : (
                    <>
                        <CssHeight height="32px" />
                        <div className={classes.centeredDiv}>
                            <CssHeight height="32px" />
                            <CustomParagraph1
                            fontSize="24px"
                            >
                                このページにアクセスするにはログインが必要です
                            </CustomParagraph1>

                            <CssHeight height="32px" />

                            <SecondaryButton onClick={onClickGoLogin} >
                                ログインする
                            </SecondaryButton>
                        </div>
                    </>
                )
            }
            <CssHeight height='64px' />

            <FooterOrganism />
        </>
    );
};