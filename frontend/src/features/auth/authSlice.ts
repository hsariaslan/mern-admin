import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IUser} from "../common/interfaces/IUser";

interface AuthState {
    isAuthenticated: boolean;
    user: IUser | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUp: (state: AuthState, action: PayloadAction<IUser>): void => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        login: (state: AuthState, action: PayloadAction<IUser>): void => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state: AuthState): void => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const {signUp, login, logout} = authSlice.actions;
export default authSlice.reducer;