import { UserType } from "../types/userType";

// ユーザー情報を保存する関数
// 使用例
// saveUserToSessionStorage({
//    name: "John Doe",
//    age: 30,
//    email: "john.doe@example.com"
// });
export const saveUserToSessionStorage = (object: UserType) => {
    try {
        const jsonString = JSON.stringify(object);
        sessionStorage.setItem("user", jsonString);
    } catch (error) {
        console.error("ユーザー情報の保存に失敗しました:", error);
    }
};


// ユーザー情報を取得する関数
// 使用例：
// const retrievedUser = getUserFromSessionStorage();
// console.log(retrievedUser); 
const noLoginUser:UserType = {
    is_login: false,
            username: "",
            nick_name: "",
            email: "",
            token: "",
            todos: 0,
}
export const getUserFromSessionStorage = () => {
    try {
        let loginUser:UserType = noLoginUser;

        const sessionItem = sessionStorage.getItem("user");
        if( sessionItem != null &&
            sessionItem != undefined &&
            sessionItem !== "undefined" &&
            sessionItem !== ""){
            loginUser = JSON.parse(sessionItem)
        }
        return loginUser;

    } catch (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
        return noLoginUser;
    }
};


