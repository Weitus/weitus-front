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
	const variant = headerConfig(location.pathname);
	const navigate = useNavigate();
	const {isLoggedIn, setIsLoggedIn} = useUserContext()

	const handleClick = () => {
		if (isLoggedIn) {
			localStorage.removeItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN);
			setIsLoggedIn(false);
		}
	}

	return (
		<div className={clsx(s.container, s["variant-" + variant])}>
			{variant === HEADER_VARIANT.defaultWithBack &&
				<WeIconButton
					icon={<Arrow/>}
					theme="transparent"
					onClick={() => {
						navigate(-1)
					}}
				/>}
			{variant === HEADER_VARIANT.chat &&
				<WeLinkButton
					href={PATHS.login}
					variant={"small"}
					onClick={handleClick}
				>
					{isLoggedIn ? "Logout" : "Login"}
				</WeLinkButton>}
		</div>
	)
}
