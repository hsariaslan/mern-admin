export interface ILogin {
    username: string,
    password: string,
}

export interface ISignUp extends ILogin {
    email: string,
    confirm_password: string,
}