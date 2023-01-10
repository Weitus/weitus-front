import React, {useEffect} from 'react'
import {LOCAL_STORAGE_CONFIG} from "../../config/localStorageConfig";
import {useUserContext} from "../../context/UserContext";

export const WeAuthGate: React.FC<React.PropsWithChildren> = (
    {
        children
    }) => {

    const {setIsLoggedIn} = useUserContext();

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN)) {
            setIsLoggedIn(true);
        }
    })

    return (
        <>{children}</>
    )
}

