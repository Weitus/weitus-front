import React from 'react'
import {TemplatePage} from "../../templates/TemplatePage";
import s from "./LoginPage.module.scss"
import {WeButton} from "../../components/WeButton";
import {Link} from "react-router-dom";
import {PATHS} from "../../config/paths";
import {WeInput} from "../../components/WeInput";

export const LoginPage: React.FC = () => {


	return (
		<TemplatePage>
			<h1>
				Login
			</h1>
			<div className={s.formContainer}>
				<div className={s.inputContainer}>
					<WeInput placeholder="Login"/>
					<WeInput type="password" placeholder="Password"/>
				</div>
				<WeButton>Login</WeButton>
				<p className={s.signInCaption}>
					Don’t have account?{" "}
					<Link to={PATHS.signup}>Sign In</Link>
				</p>
			</div>
		</TemplatePage>
	)
}
