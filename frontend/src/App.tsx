import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/sign-up" element={<SignUp />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
