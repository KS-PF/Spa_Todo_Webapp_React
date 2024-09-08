import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { TodoType } from '../../../../types/todoType';
import classes from "./todoCard.module.css";
import { CssWidth } from '../../../atoms/css/cssWidth';
import { PrimaryButton } from '../../../atoms/button/PrimaryButton';
import { TertiaryButton } from '../../../atoms/button/TertiaryButton';
import { InputText } from '../../../atoms/input/text/inputText';
import { PriorityStatusCss } from './priority/priorityStatus';
import { SelectBox } from '../../../atoms/input/select/selectBox';
import { useDeleteTodo, useUpdateTodo } from '../../../../hooks/api/useApiTodos';


type Props = {
    todo: TodoType,
    onToggleComplete: (todo: TodoType) => void,
}

export const TodoCard:FC<Props> = memo((props) => {
    const { todo, onToggleComplete} = props;
    const [inputValue, setInputValue] = useState<string>(todo.title);
    const [selectValue, setSelectValue] = useState<number>(todo.priority_status);
    const { doDeleteTodo } = useDeleteTodo();
    const { doUpdateTodo } = useUpdateTodo();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const onClickEditTitle = (e :ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleCheckboxChange = useCallback(() => {
        if(todo != undefined){
            onToggleComplete(todo);
        }
    }, [onToggleComplete, todo]);


    const handleToggleIsEdit = () => {
        setIsEdit(!isEdit);
    };

    const onClickEditTodo = () => {
        if(inputValue.length > 3){
            doUpdateTodo({
                id: todo.id,
                title: inputValue,
                is_complete: todo.is_complete,
                priority_status: selectValue,
            });
            setIsEdit(false);
        } else {
            alert("４文字以上入力してください");
        }
    };

    const onClickDeleteTodo = () => {
        setIsEdit(false);
        if(todo.id != undefined){
            doDeleteTodo(todo.id);
        }
    };

    const onClickEditSelect = (e: ChangeEvent<HTMLSelectElement>) => {
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

    return (
        <div className={
            todo.is_complete ? 
            (`${classes.wrapper} ${classes.done}`) 
            : 
            (`${classes.wrapper} ${classes.yet}`)
        }>
            <div className={classes.flex}>
                <PriorityStatusCss priority={todo.priority_status} />
                <CssWidth width='24px' />
                ID:{ todo.id } 
            </div>

            <p 
                className={classes.title}
                onClick={handleToggleIsEdit}
            >
                { todo.title }
            </p>

            {
                isEdit ? (
                    <div className={classes.wrapEditOut}>
                        <div className={classes.wrapEditIn}>
                            <InputText 
                                value={inputValue}
                                placeholder="更新内容を入力してください"
                                onChange={onClickEditTitle}
                                type="text"
                                minLength={4}
                                maxLength={48}
                                width="50%"
                                margin="16px 0"
                            />
                    
                            <CssWidth width="4px" />

                            <SelectBox 
                                selectValue={selectValue} 
                                onChange={onClickEditSelect} 
                                options={options}
                                width="fit-context"
                            />
                    
                            <CssWidth width="8px" />
                    
                            <PrimaryButton onClick={onClickEditTodo}>
                                更新
                            </PrimaryButton>

                            <CssWidth width="8px" />

                            <TertiaryButton onClick={onClickDeleteTodo}>
                                削除
                            </TertiaryButton>

                        </div>
                    </div>
                ) : null
            }

            <div className={classes.flex}>
                <input 
                    type="checkbox" 
                    checked={todo.is_complete} 
                    className={classes.checkbox}
                    onChange={handleCheckboxChange} 
                /> ：
                { todo.is_complete ? (
                    <span>作業中に戻す</span>
                ) : (
                    <span>完了にする</span>
                )}
            </div>
        </div>
    );
});