import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../Api/auth/useLogout";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { getUserFromSessionStorage } from "../../../sessionStorage/userSessionStorage";
import { CssHeight } from "../../atoms/css/cssHeight";

export const LogoutOrganism = () => {
    
    const { doLogout } = useLogout();

    const navigate = useNavigate();

    const retrievedUser = getUserFromSessionStorage();

    const onClickDolLogout = () => {
        if (retrievedUser.is_login) {
            doLogout();
        };
    };
    const onClickBack = () => navigate('/');


    return (
        <>
            <h2>ログアウトしますか？</h2>
            <p>
                以下のボタンを押してログアウトしてください。
            </p>
            
            <CssHeight height="24px" />

            <PrimaryButton onClick={onClickDolLogout}>
                ログアウトする
            </PrimaryButton>

            <CssHeight height="24px" />

            <SecondaryButton onClick={onClickBack}>
                ホームへ戻る
            </SecondaryButton>
        </>
    );
}