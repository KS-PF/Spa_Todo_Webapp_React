import { useState, useCallback } from "react";
import axios from "axios";
import { TodoType } from "../../../types/todoType";
import { getUserFromSessionStorage, saveUserToSessionStorage } from "../../../sessionStorage/userSessionStorage";
import { UserType } from "../../../types/userType";
import { EndpointUrl } from "../endpointUrl";

export const useAllTodos = () => {
    const [todoData, setTodoData] = useState<Array<TodoType>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const retrievedUser = getUserFromSessionStorage();


    const getTodos = useCallback(() => {

        if (retrievedUser.is_login){
            console.log("全データの取得");
            setLoading(true);
            setError(false);


            axios.get<Array<TodoType>>(
                EndpointUrl + 'todos/.json', {
                    headers: {
                        Authorization: `token ${retrievedUser.token}`
                    }
                }
            ).then((result) => {
                const data = result.data.map((todo) => ({
                    id: todo.id,
                    title: todo.title,
                    is_complete: todo.is_complete,
                    priority_status: todo.priority_status,
                }));
                setTodoData(data);
                
                const user:UserType = {
                    is_login: retrievedUser.is_login,
                    username: retrievedUser.username,
                    email: retrievedUser.email,
                    nick_name: retrievedUser.nick_name,
                    token: retrievedUser.token,
                    todos: data.length,
                };

                saveUserToSessionStorage(user);


            }).catch(() => {
                setError(true);
            }).finally(() => {
                setLoading(false);
                
            });
        } else {
            alert("ログインが必要です");
        }
        
    }, [retrievedUser]);

    return { getTodos, todoData, loading, error };
};