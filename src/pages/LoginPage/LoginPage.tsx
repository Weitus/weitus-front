import React from 'react'
import {TemplatePage} from "templates/TemplatePage";
import s from "./LoginPage.module.scss"
import {WeButton} from "components/WeButton";
import {Link, useNavigate} from "react-router-dom";
import {PATHS} from "config/paths";
import {WeInput} from "components/WeInput";
import {login, LoginData} from "api/auth/login";
import {FieldValues, useForm} from "react-hook-form";
import {LOCAL_STORAGE_CONFIG} from "config/localStorageConfig";
import {useMutation} from "react-query";
import {useUserContext} from "context/UserContext";

export const LoginPage: React.FC = () => {

	const redirect = useNavigate();
	const {register, handleSubmit} = useForm();
	const loginMutation = useMutation("login", login);
	const {setIsLoggedIn} = useUserContext()
	const [error, setError] = React.useState("");

	const onSubmit = (data: FieldValues) => {
		const loginData: LoginData = {
			UserName: data.UserName,
			Password: data.Password
		}
		loginMutation.mutate(loginData, {
			onSuccess: (data) => {
				localStorage.setItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN, data.data.token);
				setIsLoggedIn(true);
				redirect(PATHS.chat);
			},
			onError: (error: any) => {
				setError(error?.response?.data?.message);
			}
		})
	}

	return (
		<TemplatePage>
			<h1>
				Login
			</h1>
			<div className={s.contentContainer}>
				<form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
					<div className={s.inputContainer}>
						<WeInput placeholder="Login" {...register("UserName")}/>
						<WeInput type="password" placeholder="Password" {...register("Password")}/>
					</div>
					{error && <p className={s.error}>{error}</p>}
					<WeButton type="submit">Login</WeButton>
				</form>
				<p className={s.signInCaption}>
					Don’t have account?{" "}
					<Link to={PATHS.signup}>Sign Up</Link>
				</p>
			</div>
		</TemplatePage>
	)
}
