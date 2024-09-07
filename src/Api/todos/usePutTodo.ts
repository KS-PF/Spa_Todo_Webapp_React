import { useCallback, useState } from "react";
import axios from "axios";
import { TodoType } from "../../types/todoType";
import { useApiCountContext } from "../../providers/useApiCountContext";
import { getUserFromSessionStorage } from "../../sessionStorage/userSessionStorage";
import { EndpointUrl } from "./endpointUrl";


export const useUpdateTodo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { apiCount, setApiCount } = useApiCountContext();
    
    const retrievedUser = getUserFromSessionStorage();

    const doUpdateTodo = useCallback((data: TodoType) => {
        if(retrievedUser.is_login){
            console.log("Todo更新");
            setLoading(true);
            setError(false);

            axios.put(`${EndpointUrl}todos/${data.id}/`, {
                "title": data.title,
                "priority_status": data.priority_status,
                "is_complete": data.is_complete,
            }, {
                headers: {
                    Authorization: `Token ${retrievedUser.token}`
                }
            }).then(() => {
                // 更新が成功したときの処理
                alert("タスクを更新しました");
                setApiCount(apiCount + 1);

            }).catch(() => {
                setError(true);
                alert("タスクを更新できませんでした");
                
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [retrievedUser.is_login, retrievedUser.token, setApiCount, apiCount]);

    return { doUpdateTodo, loading, error };
};