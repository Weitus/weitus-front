import React, { useState } from 'react'
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
			<h1>
				WEITUŚ Chatbot
			</h1>
			<div className={s.buttonContainer}>
				<WeLinkButton href={PATHS.login}>Login</WeLinkButton>
				<WeButton>Chat without login in</WeButton>
			</div>
		</TemplatePage>
	)
}
