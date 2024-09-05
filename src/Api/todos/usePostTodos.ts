import { useCallback, useState } from "react";
import axios from "axios";
import { urlCommon } from "../../common/urlCommon";
import { PostTodoType } from "../../types/todoType";
import { useApiCountContext } from "../../providers/useApiCountContext";
import { getUserFromSessionStorage } from "../../sessionStorage/userSessionStorage";


export const usePostTodo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { apiCount, setApiCount } = useApiCountContext();

    const retrievedUser = getUserFromSessionStorage();

    const doPostTodo = useCallback((data:PostTodoType) => {
        if(retrievedUser.todos < 20 && retrievedUser.is_login){
            console.log("Todo送信");
            setLoading(true);
            setError(false);
            axios.post(urlCommon+'todos/', {
                    "title": data.title,
                    "priority_status": data.priority_status,
                    "is_complete": data.is_complete,
            },{
                headers: {
                        Authorization: `Token ${retrievedUser.token}`
                }
            }).then(() => {
            // console.log(result.data);
            setApiCount(apiCount + 1);

            }).catch(() => {
                setError(true);
                // console.log(error)

            }).finally(() => {
                setLoading(false);
            });
        }else{
            alert("タスクを２０個以上追加することはできません");
        }
    },[retrievedUser.todos, retrievedUser.is_login, retrievedUser.token, setApiCount, apiCount]);
    return { doPostTodo, loading, error }
}