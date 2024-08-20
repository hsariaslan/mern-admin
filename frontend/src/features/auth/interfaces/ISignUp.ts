import {ILogin} from "./ILogin";

export interface ISignUp extends ILogin {
    email: string;
    confirm_password: string;
}