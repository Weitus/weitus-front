import React from 'react'
import {TemplatePage} from "../../templates/TemplatePage";
import s from "./SignupPage.module.scss"
import {WeButton} from "../../components/WeButton";
import {WeInput} from "../../components/WeInput";
import {FieldValues, useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {RegisterData, registerUser} from "../../api/auth/register";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../config/paths";

export const SignupPage: React.FC = () => {

	const {register, handleSubmit} = useForm();

	const redirect = useNavigate();
	const registerMutation = useMutation("register", registerUser);
	const [error, setError] = React.useState("");

	const onSubmit = (data: FieldValues) => {
		const registerData: RegisterData = {
			UserName: data.UserName,
			Password: data.Password,
			Email: data.Email
		}
		registerMutation.mutate(registerData, {
			onSuccess: () => {
				redirect(PATHS.login);
			},
			onError: (error: any) => {
				setError(error.response.data[0].description);
			}
		});
	}

	return (
		<TemplatePage>
			<h1>
				Sign-up
			</h1>
			<form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.inputContainer}>
					<WeInput placeholder="Email" {...register("Email")}/>
					<WeInput placeholder="Login" {...register("UserName")}/>
					<WeInput type="password" placeholder="Password" {...register("Password")}/>
					<WeInput type="password" placeholder="Repeat Password"/>
					{error && <p className={s.error}>{error}</p>}
				</div>
				<WeButton type="submit">Register</WeButton>
			</form>
		</TemplatePage>
	)
}
