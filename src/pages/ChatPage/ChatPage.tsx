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
				<div className={s.messageBox}>
					<div className={s.MessageTimeBOT}>
						<p className={s.timeText}> 12:37 </p>
					</div>
					<div className={s.messageContainerBOT}>
						<p className={s.messageTextBOT}> Cześć, jestem Weituś - uczelniany bot WEiTI! </p>
					</div>
				</div>
				<div className={s.messageBox}>
					<div className={s.MessageTimeBOT}>
						<p className={s.timeText}> 12:37 </p>
					</div>
					<div className={s.messageContainerBOT}>
						<p className={s.messageTextBOT}> W czym mógłbym Ci pomóc? </p>
					</div>
				</div>

				<div className={s.messageBox}>
					<div className={s.messageContainerUser}>
						<p className={s.messageTextUser}> Chciałbym poznać ofertę edukacyjną Twojego wydziału. </p>
					</div>
					<div className={s.MessageTimeBOT}>
						<p className={s.timeText}> 12:39 </p>
					</div>
				</div>
				<div className={s.messageBox}>
					<div className={s.messageContainerUser}>
						<p className={s.messageTextUser}> Mógłbyś opowiedzieć mi, jakie kierunki są u was dostępne? </p>
					</div>
					<div className={s.MessageTimeBOT}>
						<p className={s.timeText}> 12:40 </p>
					</div>
				</div>


				<div className={s.messageBox}>
					<div className={s.MessageTimeBOT}>
						<p className={s.timeText}> 12:40 </p>
					</div>
					<div className={s.messageContainerBOT}>
						<p className={s.messageTextBOT}> Zajrzyj na stronę:<a href="https://www.elka.pw.edu.pl/content/view/full/18114 "> <strong>Opis kierunków studiów</strong></a></p>
					</div>
				</div>


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
