import React, {useEffect} from 'react'
import {TemplatePage} from "../../templates/TemplatePage";
import {WeIconButton} from "../../components/WeIconButton";
import {ReactComponent as Arrow} from "assets/icons/arrow.svg";
import s from "./ChatPage.module.scss";
import {WeInput} from "../../components/WeInput";
import {getMessages} from "../../api/chat/getMessages";
import {useForm} from "react-hook-form";
import {sendMessage} from "../../api/chat/sendMessage";

export const ChatPage: React.FC = () => {

	const [messages, setMessages] = React.useState([])
	const {register, formState, handleSubmit, resetField} = useForm()

	const fetchMessages = () => {
		getMessages().then(r => setMessages(r.data));
	}

	const onSubmit = (data: any) => {
		sendMessage(data).then(() => {
			fetchMessages();
		})
		resetField("Message");
	}

	useEffect(() => {
		fetchMessages();
	}, [])


	return (
		<TemplatePage>
			<div className={s.container}>
				<div className={s.chatContainer}>
					{messages.map((mess: any, index) => {
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
