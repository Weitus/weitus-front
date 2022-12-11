import React, {useEffect} from 'react'
import {TemplatePage} from "templates/TemplatePage";
import {WeIconButton} from "components/WeIconButton";
import {ReactComponent as Arrow} from "assets/icons/arrow.svg";
import s from "./ChatPage.module.scss";
import {WeInput} from "components/WeInput";
import {getMessages} from "api/chat/getMessages";
import {useForm} from "react-hook-form";
import {sendMessage} from "api/chat/sendMessage";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useUserContext} from "../../context/UserContext";

export const ChatPage: React.FC = () => {

	const {
		register,
		handleSubmit,
		resetField
	} = useForm()

	const {
		isLoading,
		error,
		data: messages,
		refetch: getMessagesRefetch
	} = useQuery<any, AxiosError>("messages", getMessages)

	const {isLoggedIn} = useUserContext()

	const onSubmit = (data: any) => {
		sendMessage(data).then(() => {
			getMessagesRefetch()
		})
		resetField("Message");
	}

	useEffect(() => {
		if (isLoggedIn) {
			getMessagesRefetch();
		}
	}, [])

	console.log(messages)

	return (
		<TemplatePage>
			<div className={s.container}>
				<div className={s.chatContainer}>
					{isLoggedIn && !isLoading && !error && messages.map((mess: any, index: number) => {
						return <p key={`message-${index}`}>{mess.message}</p>
					})}
				</div>
				<form className={s.chatFormContainer} onSubmit={handleSubmit(onSubmit)}>
					<WeInput
						variant="chat"
						placeholder="Type your message..."
						{...register("Message", {required: true})}
					/>
					<WeIconButton
						className={s.sendButton}
						icon={<Arrow/>}
						type="submit"
					/>
				</form>
			</div>
		</TemplatePage>
	)
}
