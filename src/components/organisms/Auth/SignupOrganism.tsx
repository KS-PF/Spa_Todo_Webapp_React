import { useState } from 'react';
import { LoginInputText } from '../../molecules/Auth/input/loginInputText';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { CssHeight } from '../../atoms/css/cssHeight';
import { SignupType } from '../../../types/userType';
import { validateIsAlphanumeric } from '../../molecules/validation/formValidations';
import { useSignUp } from '../../../hooks/api/useApiAuth';

export const SignupOrganism = () => {
    const { doSignUp, loading, error } = useSignUp();

    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpNickname, setSignUpNickname] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpConfirm, setSignUpConfirm] = useState("");

    const signUpData:SignupType = {
        username: signUpUsername,
        email: signUpEmail,
        nick_name: signUpNickname,
        password: signUpPassword
    }


    const onClickSignUp = () => {
        if(!signUpUsername || !signUpNickname ||
            !signUpEmail || !signUpPassword ||
            !signUpConfirm
        ){
            alert("全て入力してください");
        } else if(signUpConfirm !== signUpPassword){
            alert("パスワードが一致していません");

        } else if (!validateIsAlphanumeric(signUpUsername)) {
            alert("ユーザーIDは半角英数字で構成してください");

        } else if (!validateIsAlphanumeric(signUpPassword)) {
            alert("パスワードは半角英数字で構成してください");

        }else{
            // console.log(signUpData);
            doSignUp(signUpData);
        }
    };

    const inputFields = [
        { label: "ユーザーID", placeholder: "ユーザーIDを入力してください", min: 8, max: 48, inputValue: signUpUsername, setInputValue: setSignUpUsername },
        { label: "ニックネーム", placeholder: "ニックネームを入力してください", min: 2, max: 48, inputValue: signUpNickname, setInputValue: setSignUpNickname },
        { label: "メールアドレス", placeholder: "メールアドレスを入力してください", min: 8, max: 48, inputValue: signUpEmail, setInputValue: setSignUpEmail },
        { label: "パスワード", placeholder: "パスワードを入力してください", min: 8, max: 48, inputValue: signUpPassword, setInputValue: setSignUpPassword, type: "password" },
        { label: "パスワード(確認)", placeholder: "もう一度パスワードを入力してください", min: 8, max: 48, inputValue: signUpConfirm, setInputValue: setSignUpConfirm, type: "password", is_need_message: false },
    ];

    return (
        <>
            {loading ? (
                    <p>登録中....</p>
                ) : (
                    <>
                    <h2>新規登録</h2>
                    
                    { error ? (
                        <>
                            <p>新規登録に失敗しました</p>
                        </>
                    ) : null}
                    {   
                        inputFields.map((field, index) => (
                            <LoginInputText 
                                key={index}
                                label={field.label}
                                placeholder={field.placeholder}
                                min={field.min}
                                max={field.max}
                                inputValue={field.inputValue}
                                setInputValue={field.setInputValue}
                                type={field.type} 
                                is_need_message={field.is_need_message}
                                id={`${index}`}
                            />
                        ))
                    }
                        
                    <CssHeight height='24px' />

                    <PrimaryButton 
                        onClick={onClickSignUp}
                    >
                        新規登録
                    </PrimaryButton>
                </>
                )
            }
        </>
    );
}