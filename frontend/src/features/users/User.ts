import {IUser} from "../common/interfaces/IUser";

export default interface UserModel extends IUser {
    _id: string;
    password: string;
    confirm_password: string;
}