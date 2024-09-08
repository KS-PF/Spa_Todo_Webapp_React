import { useState, useCallback } from "react";
import { getUserFromSessionStorage, saveUserToSessionStorage } from "../../sessionStorage/userSessionStorage";
import { useApiCountContext } from "../../providers/useApiCountContext";
import { SignupType, UserType } from "../../types/userType";
import { apiClient, authHeader } from "./endpointUrl";
import { useNavigate } from "react-router-dom";

// ログイン
export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const { apiCount, setApiCount } = useApiCountContext();

    const doLogin = useCallback(async(username:string, password:string) => {
        try {
                console.log("ログイン");
                setLoading(true);
                setError(false);

                const result = await apiClient.post('accounts/login/', { username, password });

                const user: UserType = {
                    is_login: true,
                    username: result.data.username,
                    email: result.data.email,
                    nick_name: result.data.nickname,
                    token: result.data.token,
                    todos: 0,
                };
                saveUserToSessionStorage(user);
                navigate('/');
                alert("ログインしました");
        } catch {
            setError(true);
            alert("ログインに失敗しました");

        } finally {
            setLoading(false);  
            setApiCount(apiCount + 1);
        }
    }, [navigate, setApiCount, apiCount])
    return { doLogin, loading, error }
}


// ログアウト
export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const retrievedUser = getUserFromSessionStorage();

    const doLogout = useCallback(async() => {
        if(retrievedUser.is_login){
            try {
                console.log("ログアウト");
                setLoading(true);
                setError(false);

                await apiClient.post('accounts/logout/', {}, authHeader(retrievedUser.token));
                sessionStorage.clear();
                navigate('/login');
                alert("ログアウトしました");

            } catch {
                setError(true);
                console.log(error)

            } finally {
                setLoading(false);
            }
        }
    },[error, navigate, retrievedUser.is_login, retrievedUser.token]);
    return { doLogout, loading, error }
}


// サインアップ
export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { apiCount, setApiCount } = useApiCountContext();
    const navigate = useNavigate()

    const doSignUp = useCallback(async(data:SignupType) => {
        try {
            console.log("サインアップ");
            setLoading(true);
            setError(false);

            await apiClient.post('accounts/signup/', data);
            navigate('/login');
            alert('新規登録しました');

        } catch(error:any) {
            setError(true);
            const toMessage: { [key: string]: string } = {
                username: 'ユーザーネーム',
                email: 'メールアドレス',
                nick_name: 'ニックネーム',
                password: 'パスワード'
            };

            let error_message:string = "";

            Object.entries(error.response.data).forEach(([key, value]) => {
                error_message = error_message + `${toMessage[key]}:${value} \n`
            });

            alert(error_message);

        } finally {
            setLoading(false);
            setApiCount(apiCount + 1);
        }
    }, [navigate, setApiCount, apiCount]);
    return { doSignUp, loading, error }
}