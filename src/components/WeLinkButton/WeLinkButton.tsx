import React from 'react'
import {WeLinkButtonProps} from "./WeLinkButton.types";
import {Link} from "react-router-dom";
import {WeButton} from "../WeButton";
import clsx from "clsx";
import s from "./WeLinkButton.module.scss";

export const WeLinkButton: React.FC<WeLinkButtonProps> = (
	{
		children,
		className,
		buttonClassName,
		href,
		variant = 'default',
		...props
	}) => {

	return (
		<Link className={clsx(className, s["variant-" + variant])} to={href}>
			<WeButton
				className={buttonClassName}
				variant={variant}
				{...props}
			>
				{children}
			</WeButton>
		</Link>
	)
}
