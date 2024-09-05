import { SignupOrganism } from "../organisms/Auth/SignupOrganism";
import { NoLoginTemplete } from "../templates/noLoginTemplete copy";

export const SignupPage = () => {
    return (
        <NoLoginTemplete>
            <SignupOrganism />
        </NoLoginTemplete>
    );
};