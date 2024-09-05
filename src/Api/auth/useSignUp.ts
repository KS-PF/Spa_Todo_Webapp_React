import { useCallback, useState } from "react";
import axios from "axios";
import { urlCommon } from "../../common/urlCommon";
import { useApiCountContext } from "../../providers/useApiCountContext";
import { useNavigate } from "react-router-dom";
import { SignupType } from "../../types/userType";


export const useSignUp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { apiCount, setApiCount } = useApiCountContext();

    const navigate = useNavigate()

    const doSignUp = useCallback((data:SignupType) => {
        console.log("サインアップ");
        setLoading(true);
        setError(false);

        axios.post(urlCommon+'accounts/signup/', {
                "username": data.username,
                "email": data.email,
                "nick_name": data.nick_name,
                "password": data.password
        }).then(() => {
            // console.log(result.data);
            navigate('/login');
            alert('新規登録しました');

        }).catch((error) => {
            setError(true);
            // console.log(error.response.data);

            const toMessage: { [key: string]: string } = {
                username: 'ユーザーネーム',
                email: 'メールアドレス',
                nick_name: 'ニックネーム',
                password: 'パスワード'
            };

            let error_message:string = "";

            Object.entries(error.response.data).forEach(([key, value]) => {
                // console.log(toMessage[key], (value as string[])[0]); 
                error_message = error_message + `${toMessage[key]}:${value} \n`
            });

            alert(error_message);

        }).finally(() => {
            setLoading(false);
            setApiCount(apiCount + 1);
        });
    }, [navigate, setApiCount, apiCount]);
    return { doSignUp, loading, error }
}