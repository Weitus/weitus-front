import React, {useEffect} from 'react'
import {LOCAL_STORAGE_CONFIG} from "../../config/localStorageConfig";
import {useUserContext} from "../../context/UserContext";
import {Navigate, useLocation} from "react-router-dom";
import {PATHS} from "../../config/paths";

export const WeAuthGate: React.FC<React.PropsWithChildren> = (
    {
        children
    }) => {

    const {isLoggedIn, setIsLoggedIn} = useUserContext();
    const location = useLocation()

    const generateRandomId = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (var i = 0; i < 32; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result
    }


    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN)) {
            setIsLoggedIn(true);
        } else if (location.pathname === PATHS.chat) {
            localStorage.setItem(LOCAL_STORAGE_CONFIG.CHAT_TOKEN, generateRandomId());
        }
    }, []);

    if (isLoggedIn && location.pathname !== PATHS.chat) return <Navigate to={PATHS.chat}/>

    return (
        <>{children}</>
    )
}

