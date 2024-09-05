import { getUserFromSessionStorage } from "../../sessionStorage/userSessionStorage";
import { CssHeight } from "../atoms/css/cssHeight";
import { CustomParagraph1 } from "../atoms/p/customParagraph1";
import { TodoAddForm } from "../organisms/Todos/todoAddForm";
import { TodoList } from "../organisms/Todos/todoList";
import { MainTemplete } from "../templates/mainTemplete";

export const HomePage = () => {
    const retrievedUser = getUserFromSessionStorage();
    const topPageGreeting:string = `こんにちは、${ retrievedUser.nick_name }さん！`;
    
    return (
        <MainTemplete>
            <CustomParagraph1 
                fontSize="24px"
                margin="8px 0"
            >
                {topPageGreeting}
            </CustomParagraph1>
            
            <TodoAddForm />
            <CssHeight height='16px' />
            <TodoList />
        </MainTemplete>
    );
};