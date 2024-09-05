import React from 'react';
import { TodoType } from '../../../../types/todoType';
import { getUserFromSessionStorage } from '../../../../sessionStorage/userSessionStorage';
import { CustomParagraph1 } from '../../../atoms/p/customParagraph1';
import { TodoCard } from '../card/todoCard';

type TodoListProps = {
    title: string;
    todos: TodoType[];
    getError: boolean;
    getLoading: boolean;
    selectedPriority?: number;
    handleToggleComplete: (todo: TodoType) => void;
    isCompleted: boolean;
};

export const TodoListMolecules: React.FC<TodoListProps> = ({
    title,
    todos,
    getError,
    getLoading,
    selectedPriority,
    handleToggleComplete,
    isCompleted,
}) => {
    const retrievedUser = getUserFromSessionStorage();
    return (
        <>
            <CustomParagraph1 fontWeight="bold" fontSize="24px">
                {title}
            </CustomParagraph1>

            {retrievedUser.todos ? null : <p>なし</p>}

            {getError ? (
                <p>データの取得に失敗しました</p>
            ) : getLoading ? (
                <p>Loading....</p>
            ) : (
                <div>
                    {todos.map((todo) => {
                        if (isCompleted) {
                            return todo.is_complete ? (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    onToggleComplete={handleToggleComplete}
                                />
                            ) : null;
                        } else {
                            return !todo.is_complete &&
                                (!selectedPriority || todo.priority_status === selectedPriority) ? (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    onToggleComplete={handleToggleComplete}
                                />
                            ) : null;
                        }
                    })}
                </div>
            )}
        </>
    );
};
