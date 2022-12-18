import React, {useEffect, useState} from 'react'
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
import {WeMessageContainer} from "../../components/WeMessageContainer";

const MOCKED_MESSAGES = [
	{
		text: "Cześć, jestem Weituś - uczelniany bot WEiTI!",
		time: "12:37",
		isFromBot: true
	},
	{
		text: "W czym mógłbym Ci pomóc?",
		time: "12:38",
		isFromBot: true
	},
	{
		text: "Chciałbym poznać ofertę edukacyjną Twojego wydziału.",
		time: "12:39",
		isFromBot: false
	},
	{
		text: "Mógłbyś mi opowiedzieć, jakie kierunki są u was dostępne?",
		time: "12:40",
		isFromBot: false
	},
	{
		text: "Zajrzyj na stronę:",
		time: "12:40",
		isFromBot: true,
		link: {
			href: "https://www.elka.pw.edu.pl/content/view/full/18114",
			text: "Opis kierunków studiów"
		}
	}
]

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
	const [currentMessages, setCurrentMessages] = useState(MOCKED_MESSAGES)

	const onSubmit = (data: any) => {
		if (isLoggedIn) {
			sendMessage(data).then(() => {
				getMessagesRefetch()
			})
		} else {
			setCurrentMessages([...currentMessages, {
				text: data.Message,
				time: new Date().toLocaleTimeString("pl-PL", {hour: "2-digit", minute: "2-digit"}),
				isFromBot: false
			}])
		}
		resetField("Message");
	}

	useEffect(() => {
		if (isLoggedIn) {
			getMessagesRefetch();
		}
	}, [])


	return (
		<TemplatePage>

			{/* Example chat - to remove after better integration with backend */}

			<div className={s.container}>
				<div className={s.chatContainer}>
					{!isLoggedIn && currentMessages.map((message, index) => {
						return <WeMessageContainer message={message} key={`message-mock-key-${index}`}/>
					})}
					{isLoggedIn && !isLoading && !error && messages.map((mess: any, index: number) => {
						return <WeMessageContainer key={`message-key-${index}`} message={{
							text: mess.message,
							time: new Date(mess.timeStamp).toLocaleTimeString('pl-PL', {
								hour: '2-digit',
								minute: '2-digit'
							}),
							isFromBot: mess.sentByBot
						}}/>
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
