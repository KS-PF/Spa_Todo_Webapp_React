import { LoginOrganism } from "../organisms/Auth/loginOrganism";
import { NoLoginTemplete } from "../templates/noLoginTemplete copy";


export const LoginPage = () => {
    return (
        <NoLoginTemplete>
            <LoginOrganism />
        </NoLoginTemplete>
    );
};