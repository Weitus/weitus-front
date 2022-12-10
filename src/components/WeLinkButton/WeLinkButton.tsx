import React from 'react'
import s from "./WeLinkButton.module.scss"
import {WeLinkButtonProps} from "./WeLinkButton.types";
import {Link} from "react-router-dom";
import {WeButton} from "../WeButton";

export const WeLinkButton: React.FC<WeLinkButtonProps> = ({
		children,
		className, href,
		...props
	}) => {
	return (
		<Link className={s.container} to={href}>
			<WeButton
				className={className}
				{...props}
			>
				{children}
			</WeButton>
		</Link>
	)
}
