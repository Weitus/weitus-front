import React from 'react'
import s from "./WeHeader.module.scss"
import {WeHeaderProps} from "./WeHeader.types";
import {useLocation, useNavigate} from "react-router-dom";
import {headerConfig, HEADER_VARIANT} from "../../config/headerConfig";
import {WeIconButton} from "../WeIconButton";
import {ReactComponent as Arrow} from "assets/icons/arrow.svg";
import clsx from "clsx";
import {WeLinkButton} from "../WeLinkButton";
import {PATHS} from "../../config/paths";
import {useUserContext} from "../../context/UserContext";
import {LOCAL_STORAGE_CONFIG} from "../../config/localStorageConfig";

export const WeHeader: React.FC<WeHeaderProps> = ({}) => {

    const location = useLocation();
    const {variant, backPath} = headerConfig(location.pathname);
    const navigate = useNavigate();
    const {isLoggedIn, setIsLoggedIn, setUsername} = useUserContext()

    const handleClick = () => {
        if (isLoggedIn) {
            localStorage.removeItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_CONFIG.CHAT_TOKEN);
            setUsername("");
            setIsLoggedIn(false);
        }
    }

    return (
        <div data-testid="header" className={clsx(s.container, s["variant-" + variant])}>
            {variant === HEADER_VARIANT.defaultWithBack &&
                <WeIconButton
                    icon={<Arrow/>}
                    theme="transparent"
                    onClick={() => {
                        !!backPath ? navigate(backPath) : navigate(-1)
                    }}
                />}
            {variant === HEADER_VARIANT.chat &&
                <WeLinkButton
                    linkProps={{to: PATHS.login, onClick: handleClick}}
                    variant={"small"}
                >
                    {isLoggedIn ? "Logout" : "Login"}
                </WeLinkButton>}
        </div>
    )
}
