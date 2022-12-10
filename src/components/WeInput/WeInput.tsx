import React from 'react'
import s from "./WeInput.module.scss"
import {WeInputProps} from "./WeInput.types";
import clsx from "clsx";

export const WeInput: React.FC<WeInputProps> = (
	{
		className,
		variant = "primary",
		...props
	}) => {
	return (
		<label className={s.container}>
			<input className={clsx(s.input, s["variant-" + variant])} {...props}/>
		</label>

	)
}
