import React from 'react'
import {TemplatePage} from "../../templates/TemplatePage";
import s from "./SignupPage.module.scss"
import {WeButton} from "../../components/WeButton";
import {Link} from "react-router-dom";
import {PATHS} from "../../config/paths";
import {WeInput} from "../../components/WeInput";

export const SignupPage: React.FC = () => {


	return (
		<TemplatePage>
			<h1>
				Sign-up
			</h1>
			<div className={s.formContainer}>
				<div className={s.inputContainer}>
					<WeInput placeholder="Email"/>
					<WeInput placeholder="Login"/>
					<WeInput type="password" placeholder="Password"/>
					<WeInput type="password" placeholder="Repeat Password"/>
				</div>
				<WeButton>Register</WeButton>
			</div>
		</TemplatePage>
	)
}
