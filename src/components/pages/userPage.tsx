import { UserTable } from "../organisms/User/userTable";
import { MainTemplete } from "../templates/mainTemplete";

export const UserPage = () => {
    return (
        <MainTemplete>
            <UserTable />
        </MainTemplete>
    );
};