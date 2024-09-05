import classes from "./headerOrganism.module.css";
import { getUserFromSessionStorage } from "../../../sessionStorage/userSessionStorage";
import { CustomAnchor1 } from "../../atoms/a/customAnchor1";
import { CustomParagraph1 } from "../../atoms/p/customParagraph1";


export const HeaderOrganism = () => {

    const retrievedUser = getUserFromSessionStorage();


    return (
        
        <header className={classes.header}>

            <CustomParagraph1
                fontSize="18px"
                width="50%"
                textAlign="center"
            >
                Todo App
                </CustomParagraph1>

            <div className={classes.container}>
                <CustomAnchor1 to="/" >Home</CustomAnchor1>
                <CustomAnchor1 to="/user" >User</CustomAnchor1>

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
        </header>
    );
}