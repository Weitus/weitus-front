import React from "react";
import {createHashRouter, Navigate} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import {PATHS} from "./paths";
import {LoginPage} from "../pages/LoginPage";
import {SignupPage} from "../pages/SignupPage";
import {ChatPage} from "../pages/ChatPage";

export const routes = createHashRouter([
    {
        path: PATHS.home,
        element: <HomePage/>,
    },
    {
        path: PATHS.login,
        element: <LoginPage/>
    },
    {
        path: PATHS.signup,
        element: <SignupPage/>
    },
    {
        path: PATHS.chat,
        element: <ChatPage/>
    },
    {
        path: "*",
        element: <Navigate to={PATHS.home}/>
    }

])
