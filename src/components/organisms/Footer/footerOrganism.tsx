import classes from "./footerOrganism.module.css";
import { getUserFromSessionStorage } from "../../../sessionStorage/userSessionStorage";
import { CustomAnchor1 } from "../../atoms/a/customAnchor1";
import { CssHeight } from "../../atoms/css/cssHeight";


export const FooterOrganism = () => {

    const retrievedUser = getUserFromSessionStorage();


    return (
        <footer className={classes.footer}>

            <CssHeight  height="24px"/>
            
            <CustomAnchor1 to="/" fontSize="20px">
                Todo App
            </CustomAnchor1>


            <div className={classes.container}>
                <CustomAnchor1 to="/signup">
                    Sign Up
                </CustomAnchor1>
                <p>|</p>
                { retrievedUser.is_login ? (
                    <CustomAnchor1 to="/logout">
                        Logout
                    </CustomAnchor1>
                ) : (
                    <CustomAnchor1 to="/login">
                        Login
                    </CustomAnchor1>
                ) }
            </div>

            <CssHeight  height="24px"/>

            <p> Made by KS-PF 2024</p>

            <CssHeight  height="24px"/>
        </footer>
    );
}