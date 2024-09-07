import axios from "axios";
import { useCallback, useState } from "react";
import { useApiCountContext } from "../../../providers/useApiCountContext";
import { saveUserToSessionStorage } from "../../../sessionStorage/userSessionStorage";
import { UserType } from "../../../types/userType";
import { useNavigate } from "react-router-dom";
import { EndpointUrl } from "../endpointUrl";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate()

    const { apiCount, setApiCount } = useApiCountContext();

    const doLogin = useCallback((username:string, password:string) => {
        console.log("ログイン");
        setLoading(true);
        setError(false);

        axios.post(EndpointUrl+'accounts/login/', {
                "username": username,
                "password": password,

        }).then((result) => {
            // console.log(result.data);
            const user:UserType = {
                is_login: true,
                username: result.data.username,
                email: result.data.email,
                nick_name: result.data.nickname,
                token: result.data.token,
                todos: 0
            };
            saveUserToSessionStorage(user);
            navigate('/');
            alert("ログインしました");

        }).catch(() => {
            setError(true);
            alert("ログインに失敗しました");

        }).finally(() => {
            setLoading(false);  
            setApiCount(apiCount + 1);
        });
    }, [navigate, setApiCount, apiCount])
    return { doLogin, loading, error }
}