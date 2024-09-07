import { useCallback, useState } from "react";
import axios from "axios";
import { getUserFromSessionStorage } from "../../../sessionStorage/userSessionStorage";
import { useNavigate } from "react-router-dom";
import { EndpointUrl } from "../endpointUrl";


export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate()

    const retrievedUser = getUserFromSessionStorage();

    const doLogout = useCallback(() => {
        if(retrievedUser.is_login){
            console.log("ログアウト");
            setLoading(true);
            setError(false);

            axios.post(
                EndpointUrl+'accounts/logout/',
                {},
                {
                    headers: {
                            Authorization: `Token ${retrievedUser.token}`
                    }
                }
            ).then(() => {
                sessionStorage.clear();
                navigate('/login');
                alert("ログアウトしました");

            }).catch((error) => {
                setError(true);
                console.log(error)

            }).finally(() => {
                setLoading(false);
            });
        }
    },[navigate, retrievedUser.is_login, retrievedUser.token]);
    
    return { doLogout, loading, error }
}