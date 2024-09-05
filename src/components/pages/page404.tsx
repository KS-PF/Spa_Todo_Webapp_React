import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../atoms/button/SecondaryButton";
import { getUserFromSessionStorage } from "../../sessionStorage/userSessionStorage";
import { NoLoginTemplete } from "../templates/noLoginTemplete copy";
import { CustomParagraph1 } from "../atoms/p/customParagraph1";
import { CssHeight } from "../atoms/css/cssHeight";

export const Page404 = () => {

    const retrievedUser = getUserFromSessionStorage();

    const navigate = useNavigate();

    const onClickGoLogin = () => {
        navigate('/login')
    };

    const onClickGoHome = () => {
        navigate('/')
    };

    return (
        <NoLoginTemplete>
            <CssHeight height="32px" />

            <CustomParagraph1
            fontSize="24px"
            >
                ページが見つかりません
            </CustomParagraph1>
            
            <CssHeight height="32px" />
            
            {
                retrievedUser.is_login ? (
                    <SecondaryButton onClick={onClickGoHome} >
                        ホームに戻る
                    </SecondaryButton>
                ) : (
                    <SecondaryButton onClick={onClickGoLogin} >
                        ログインする
                    </SecondaryButton>
                )
            }
        </NoLoginTemplete>
    );
};

