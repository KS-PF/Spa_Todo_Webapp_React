import { ChangeEvent, useState } from "react";
import { usePostTodo } from "../../../hooks/api/todos/usePostTodos";
import { CssWidth } from "../../atoms/css/cssWidth";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useAllTodos } from "../../../hooks/api/todos/useGetTodos";
import { getUserFromSessionStorage } from "../../../sessionStorage/userSessionStorage";
import { SelectBox } from "../../atoms/input/select/selectBox";
import { InputText } from "../../atoms/input/text/inputText";
import { WrapperFlex } from "../../atoms/wrapper/wrapperflex";
import { CustomParagraph1 } from "../../atoms/p/customParagraph1";


export const TodoAddForm = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectValue, setSelectValue] = useState<number>(2);
    const retrievedUser = getUserFromSessionStorage();
    const { doPostTodo, loading, error } = usePostTodo();
    const { getTodos } = useAllTodos();

    if (selectValue < 1 || selectValue > 4) {
        setSelectValue(2);
    }

    const onClickAddTodo = () => {
        if(inputValue.length > 3){
            doPostTodo({
                title: inputValue,
                is_complete: false,
                priority_status: selectValue,
            });
            setInputValue("");
            setSelectValue(2);
            getTodos();
        } else {
            alert("４文字以上入力してください");
        }
    };

    const onChangeAddTitle = (e :ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const onClickAddSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10);
        const validValue = (!isNaN(value) && value >= 1 && value <= 4) ? value : 2;
    
        setSelectValue(validValue);
    };

    const options = [
        { value: "1", label: "低い" },
        { value: "2", label: "普通" },
        { value: "3", label: "高い" },
        { value: "4", label: "緊急" },
    ];

    const message = `残り${20 - retrievedUser.todos}個追加できます`;

    return (
        <>
            <WrapperFlex>
                <InputText 
                    value={inputValue}
                    placeholder=" 新しいタスクを入力してください"
                    onChange={onChangeAddTitle}
                    type="text"
                    minLength={4}
                    maxLength={48}
                    width="50%"
                    margin="0"
                />
        
                <CssWidth width="4px" />

                <SelectBox 
                    selectValue={selectValue} 
                    onChange={onClickAddSelect} 
                    options={options}
                    width="fit-context"
                />
        
                <CssWidth width="8px" />
        
                <PrimaryButton onClick={onClickAddTodo}>
                    追加
                </PrimaryButton>
            </WrapperFlex>
            {
                error ? (
                <p>Todoの追加に失敗しました</p>
                ) : loading ? (
                <p>送信中....</p>
                ) : (<></>)
            }
            <CustomParagraph1 
                fontSize="18px"
                width="60%"
                margin="2px auto"
                textAlign="end"
            >
                { message }
            </CustomParagraph1>
        </>
    );
};