import React from 'react'
import {TemplatePage} from "../../templates/TemplatePage";
import s from "./LoginPage.module.scss"
import {WeButton} from "../../components/WeButton";
import {Link} from "react-router-dom";
import {PATHS} from "../../config/paths";
import {WeInput} from "../../components/WeInput";
import {login, loginData} from "../../api/auth/login";
import {FieldValues, useForm} from "react-hook-form";
import {LOCAL_STORAGE_CONFIG} from "../../config/localStorageConfig";

export const LoginPage: React.FC = () => {

	const {register, formState, handleSubmit} = useForm();

	const onSubmit = (data: FieldValues) => {
		login(data as loginData).then((res) => {
			localStorage.setItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN, res.data.token)
		})
	}

	return (
		<TemplatePage>
			<h1>
				Login
			</h1>
			<form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.inputContainer}>
					<WeInput placeholder="Login" {...register("UserName")}/>
					<WeInput type="password" placeholder="Password" {...register("Password")}/>
				</div>
				<WeButton type="submit">Login</WeButton>
				<p className={s.signInCaption}>
					Don’t have account?{" "}
					<Link to={PATHS.signup}>Sign In</Link>
				</p>
			</form>
		</TemplatePage>
	)
}
