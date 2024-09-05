import { getUserFromSessionStorage } from "../../../sessionStorage/userSessionStorage";
import classes from "./userTable.module.css";

export const UserTable = () => {
    const retrievedUser = getUserFromSessionStorage();

    return (
        <>
            <h2>アカウント情報</h2>

            <table border={1} className={classes.table}>
                <tbody>
                    <tr>
                        <td>ユーザーID</td>
                        <td>{retrievedUser.username}</td>
                    </tr>

                    <tr>
                        <td>ニックネーム</td>
                        <td>{retrievedUser.nick_name}</td>
                    </tr>

                    <tr>
                        <td>メールアドレス</td>
                        <td>{retrievedUser.email}</td>
                    </tr>

                    <tr>
                        <td>パスワード</td>
                        <td>非表示</td>
                    </tr>

                    <tr>
                        <td>Todoの数</td>
                        <td>{retrievedUser.todos}個</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};