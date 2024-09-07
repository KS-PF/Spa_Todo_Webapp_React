import { ChangeEvent, memo, useEffect, useState } from "react";
import { useAllTodos } from "../../../hooks/api/todos/useGetTodos";
import { useApiCountContext } from "../../../providers/useApiCountContext";
import { TodoType } from "../../../types/todoType";
import { useUpdateTodo } from "../../../hooks/api/todos/usePutTodo";
import { SelectBox } from "../../atoms/input/select/selectBox";
import { Wrapper } from "../../atoms/wrapper/wrapper";
import { TodoListMolecules } from "../../molecules/Todo/list/todoList";
import { CssHeight } from "../../atoms/css/cssHeight";


export const TodoList = memo(() => {
    const [selectedPriority, setSelectedPriority] = useState<number>(0);
    const { getTodos, todoData, loading:getLoading, error:getError } = useAllTodos();
    const { doUpdateTodo } = useUpdateTodo();
    const { apiCount } = useApiCountContext();

    if(selectedPriority){
        if(selectedPriority < 1 && selectedPriority > 4){
            setSelectedPriority(0);
        };
    };

    useEffect(() => {
        const date = new Date();
        console.log(date);
        console.log(apiCount);
        console.log("データの取得（ユーズエフェクト）");
        getTodos();
    }, [apiCount]);

    const handleToggleComplete = (todo: TodoType) => {
        doUpdateTodo({
            id: todo.id,
            title: todo.title,
            is_complete: !todo.is_complete,
            priority_status:  todo.priority_status,
        });
    };

    const onChangeSelectPriority = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10);
        const validValue = (!isNaN(value) && value >= 0 && value <= 4) ? value : 0;
    
        setSelectedPriority(validValue);
    }

    const options = [
        { value: "0", label: "優先度：選択なし" },
        { value: "1", label: "優先度：低い" },
        { value: "2", label: "優先度：普通" },
        { value: "3", label: "優先度：高い" },
        { value: "4", label: "優先度：緊急" },
    ];

    return (
        <>
            <Wrapper textAlign="start">
                <SelectBox 
                    selectValue={selectedPriority} 
                    onChange={onChangeSelectPriority} 
                    options={options}
                    width="170px"
                    fontSize="16px"
                />
            </Wrapper>

            <TodoListMolecules
                title="作業中のタスク"
                todos={todoData}
                getError={getError}
                getLoading={getLoading}
                selectedPriority={selectedPriority}
                handleToggleComplete={handleToggleComplete}
                isCompleted={false}
            />

            <CssHeight height="24px" />

            <TodoListMolecules
                title="完了済みのタスク"
                todos={todoData}
                getError={getError}
                getLoading={getLoading}
                handleToggleComplete={handleToggleComplete}
                isCompleted={true}
            />

        </>
    );
});