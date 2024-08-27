import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";
import UsersIndex from "../features/users/index";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <AuthMiddleware>
                        <Dashboard />
                    </AuthMiddleware>
                }/>
                <Route path="/login" element={<Login />}/>
                <Route path="/sign-up" element={<SignUp />}/>
                <Route path="/users" element={
                    <AuthMiddleware>
                        <UsersIndex />
                    </AuthMiddleware>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export const AuthMiddleware = ({children}: any) => {
    if (sessionStorage.getItem("mernUser")) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default App;
