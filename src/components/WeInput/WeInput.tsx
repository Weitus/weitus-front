import React from 'react'
import s from "./WeInput.module.scss"
import {WeInputProps} from "./WeInput.types";

export const WeInput: React.FC<WeInputProps> = ({
	                                                className,
	                                                ...props
                                                }) => {
	return (
		<label className={s.container}>
			<input className={s.input} {...props}/>
		</label>

	)
}
