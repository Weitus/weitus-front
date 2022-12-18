import React from 'react'
import s from "./WeInput.module.scss"
import {WeInputProps} from "./WeInput.types";
import clsx from "clsx";

export const WeInput = React.forwardRef<any, WeInputProps>((
	{
		className,
		variant = "primary",
		...props
	}, ref
) => {
	return (
		<label className={s.container}>
			<input
				autoComplete={"off"}
				className={clsx(s.input, s["variant-" + variant])}
				ref={ref}
				{...props}
			/>
		</label>
	)
})
