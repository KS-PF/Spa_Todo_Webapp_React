import { useState } from 'react';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { CssHeight } from '../../atoms/css/cssHeight';
import { LoginInputText } from '../../molecules/Auth/input/loginInputText';
import { useLogin } from '../../../hooks/api/useApiAuth';



export const LoginOrganism = () => {

    const { doLogin, loading, error } = useLogin();

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    const onClickSignUp = () => {
        if((loginUsername.length < 8) || (loginPassword.length < 8)){
            alert("ユーザーID、パスワードを正しく入力してください");

        }else{
            doLogin(loginUsername, loginPassword);
        }
    };

    const inputFields = [
        { label: "ユーザーID", placeholder: "  ユーザーIDを入力してください", min: 8, max: 48, inputValue: loginUsername, setInputValue: setLoginUsername , is_need_message: false , id:"username"},
        { label: "パスワード", placeholder: "  パスワードを入力してください", min: 8, max: 48, inputValue: loginPassword, setInputValue: setLoginPassword, type: "password" , is_need_message: false  ,id:"password"},
    ];

    return (
        <>
            { loading ? (
                        <p>ユーザー認証中....</p>
                    ) : (
                        <>
                            <h2>ログイン</h2>
                            {error ? (
                                <>
                                    <p>ログインに失敗しました</p>
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
                                        id={field.id}
                                    />
                                ))
                            }
                                
                            <CssHeight height='24px' />
        
                            <PrimaryButton onClick={onClickSignUp}>ログイン</PrimaryButton>
                        </>
                    )
                }
        </>
    );
}