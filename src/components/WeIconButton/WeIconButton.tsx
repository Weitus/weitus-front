import React from 'react'
import s from "./WeIconButton.module.scss"
import {WeIconButtonProps} from "./WeIconButton.types";
import clsx from "clsx";
import {ReactComponent as Arrow} from "assets/icons/arrow.svg";

export const WeIconButton: React.FC<WeIconButtonProps> =
	({
		 children,
		 className,
		 theme = "primary",
		 icon,
		 ...props
	 }) => {
		return (
			<button className={clsx(
				s.container,
				s["theme-" + theme],
				className
			)} {...props}>
				{icon}
			</button>
		)
	}
