import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";

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
            </Routes>
        </BrowserRouter>
    );
}

export const AuthMiddleware = ({children}: any) => {
    if (localStorage.getItem("mernUser")) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default App;
