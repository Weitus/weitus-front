import React from 'react'
import s from "./TemplatePage.module.scss"
import {WeHeader} from "../../components/WeHeader";

export const TemplatePage: React.FC<React.PropsWithChildren> = ({children}) => {

	return (
		<>
			<WeHeader/>
			<div className={s.container}>
				{children}
			</div>
		</>
	)
}
