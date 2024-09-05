export type UserType = {
    is_login: boolean;
    username:string,
    email:string,
    nick_name:string,
    token:string,
    todos:number
};

export type SignupType = {
    username:string,
    email:string,
    nick_name:string,
    password:string,
};