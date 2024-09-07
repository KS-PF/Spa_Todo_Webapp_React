import { useCallback, useState } from "react";
import axios from "axios";
import { useApiCountContext } from "../../providers/useApiCountContext";
import { getUserFromSessionStorage } from "../../sessionStorage/userSessionStorage";
import { EndpointUrl } from "./endpointUrl";

export const useDeleteTodo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { apiCount, setApiCount } = useApiCountContext();
    const retrievedUser = getUserFromSessionStorage();

    const doDeleteTodo = useCallback((todoId: number) => {
        if(retrievedUser.is_login){
            console.log("Todo削除");
            setLoading(true);
            setError(false);

            axios.delete(`${EndpointUrl}todos/${todoId}/`, {
                headers: {
                    Authorization: `Token ${retrievedUser.token}`
                }
            }).then(() => {
                alert("削除しました");
                setApiCount(apiCount + 1);

            }).catch(() => {
                setError(true);
                alert("削除に失敗しました");

            }).finally(() => {
                setLoading(false);
            });
        }
    }, [retrievedUser.is_login, retrievedUser.token, setApiCount, apiCount]);

    return { doDeleteTodo, loading, error };
};