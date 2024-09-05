import { LogoutOrganism } from "../organisms/Auth/logoutOrganism";
import { MainTemplete } from "../templates/mainTemplete";

export const LogoutPage = () => {
    return (
        <MainTemplete>
            <LogoutOrganism />
        </MainTemplete>
    );
};