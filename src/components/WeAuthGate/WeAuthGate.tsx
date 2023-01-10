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

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN)) {
            setIsLoggedIn(true);
        }
    }, []);

    if (isLoggedIn && location.pathname !== PATHS.chat) return <Navigate to={PATHS.chat}/>

    return (
        <>{children}</>
    )
}

