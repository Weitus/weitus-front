import React, {useState} from 'react'
import reactLogo from 'assets/react.svg'
import s from "./HomePage.module.scss"
import clsx from "clsx";
import {WeButton} from "../../components/WeButton";
import {WeLinkButton} from "../../components/WeLinkButton";
import {PATHS} from "../../config/paths";
import {TemplatePage} from "../../templates/TemplatePage";

export const HomePage: React.FC = () => {

	return (
		<TemplatePage>
			{/* <h1>
				WEITUŚ Chatbot
			</h1> */}
			<img src="../../public/favicon.svg"></img>
			<div className={s.buttonContainer}>
				<WeLinkButton href={PATHS.login}>Login</WeLinkButton>
				<WeLinkButton href={PATHS.chat}>Chat without login in</WeLinkButton>
			</div>
		</TemplatePage>
	)
}
