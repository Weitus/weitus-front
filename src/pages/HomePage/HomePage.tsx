import React, {useState} from 'react'
import reactLogo from 'assets/react.svg'
import s from "./HomePage.module.scss"
import {WeLinkButton} from "../../components/WeLinkButton";
import {PATHS} from "../../config/paths";
import {TemplatePage} from "../../templates/TemplatePage";

export const HomePage: React.FC = () => {

	return (
		<TemplatePage>
			<img src="../../public/favicon.svg" alt="logo"></img>
			<div className={s.buttonContainer}>
				<WeLinkButton linkProps={{to: PATHS.login}}>Login</WeLinkButton>
				<WeLinkButton linkProps={{to: PATHS.chat}}>Chat without login in</WeLinkButton>
			</div>
		</TemplatePage>
	)
}
