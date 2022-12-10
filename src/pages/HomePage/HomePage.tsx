import React, { useState } from 'react'
import reactLogo from 'assets/react.svg'
import s from "./HomePage.module.scss"
import clsx from "clsx";
import {WeButton} from "../../components/WeButton";

export const HomePage: React.FC = () => {


	return (
		<div className={s.container}>
			<h1>
				WEITUŚ Chatbot
			</h1>
			<div className={s.buttonContainer}>
				<WeButton>Login</WeButton>
				<WeButton>Chat without login in</WeButton>
			</div>
		</div>
	)
}
