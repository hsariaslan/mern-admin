export interface LoginInterface {
    username: string,
    password: string,
}

export interface SignUpInterface extends LoginInterface {
    email: string,
    confirm_password: string,
}