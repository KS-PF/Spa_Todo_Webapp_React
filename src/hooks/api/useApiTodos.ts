import { useState, useCallback } from "react";
import { TodoType, PostTodoType } from "../../types/todoType";
import { getUserFromSessionStorage, saveUserToSessionStorage } from "../../sessionStorage/userSessionStorage";
import { useApiCountContext } from "../../providers/useApiCountContext";
import { UserType } from "../../types/userType";
import { apiClient, authHeader } from "./endpointUrl";


// useGeyTodos hook
export const useGetTodos = () => {
    const [todoData, setTodoData] = useState<Array<TodoType>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const retrievedUser = getUserFromSessionStorage();

    const getTodos = useCallback(async() => {
        if (retrievedUser.is_login) {
            try {
                console.log("全データの取得");
                setLoading(true);
                setError(false);

                const result = await apiClient.get<Array<TodoType>>('todos/.json', authHeader(retrievedUser.token))
                const data = result.data.map((todo) => ({
                    id: todo.id,
                    title: todo.title,
                    is_complete: todo.is_complete,
                    priority_status: todo.priority_status,
                }));
                setTodoData(data);

                const user: UserType = {
                    ...retrievedUser,
                    todos: data.length,
                };
                saveUserToSessionStorage(user);

            } catch { setError(true) }
            finally { setLoading(false) }
        } else {
            alert("ログインが必要です");
        }
    }, [retrievedUser]);

    return { getTodos, todoData, loading, error };
};



// usePostTodo hook
export const usePostTodo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { apiCount, setApiCount } = useApiCountContext();
    const retrievedUser = getUserFromSessionStorage();

    const doPostTodo = useCallback(async(data: PostTodoType) => {
        if (retrievedUser.todos < 20 && retrievedUser.is_login) {
            try {
                console.log("Todo送信");
                setLoading(true);
                setError(false);

                await apiClient.post('todos/', data, authHeader(retrievedUser.token))
                setApiCount(apiCount + 1)

            } catch { setError(true) }
            finally { setLoading(false) };
        } else {
            alert("タスクを２０個以上追加することはできません");
        }
    }, [retrievedUser, apiCount, setApiCount]);

    return { doPostTodo, loading, error };
};



// useUpdateTodo hook
export const useUpdateTodo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { apiCount, setApiCount } = useApiCountContext();
    const retrievedUser = getUserFromSessionStorage();

    const doUpdateTodo = useCallback(async(data: TodoType) => {
        if (retrievedUser.is_login) {
            try {
                console.log("Todo更新");
                setLoading(true);
                setError(false);

                await apiClient.put(`todos/${data.id}/`, data, authHeader(retrievedUser.token));
                alert("タスクを更新しました");
                setApiCount(apiCount + 1);

            } catch {
                setError(true);
                alert("タスクを更新できませんでした");

            } finally {
                setLoading(false);
            }
        }
    }, [retrievedUser, apiCount, setApiCount]);

    return { doUpdateTodo, loading, error };
};



// useDeleteTodo hook
export const useDeleteTodo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { apiCount, setApiCount } = useApiCountContext();
    const retrievedUser = getUserFromSessionStorage();

    const doDeleteTodo = useCallback(async(todoId: number) => {
        if (retrievedUser.is_login) {
            try {
                console.log("Todo削除");
                setLoading(true);
                setError(false);

                await apiClient.delete(`todos/${todoId}/`, authHeader(retrievedUser.token))
                alert("削除しました");
                setApiCount(apiCount + 1);

            } catch {
                setError(true);
                alert("削除に失敗しました");

            } finally {
                setLoading(false);
            }
        }
    }, [retrievedUser, apiCount, setApiCount]);

    return { doDeleteTodo, loading, error };
};