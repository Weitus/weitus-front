import React from 'react'
import {TemplatePage} from "../../templates/TemplatePage";
import {WeIconButton} from "../../components/WeIconButton";
import {ReactComponent as Arrow} from "assets/icons/arrow.svg";
import s from "./ChatPage.module.scss";
import {WeInput} from "../../components/WeInput";

export const ChatPage: React.FC = () => {

	return (
		<TemplatePage>
			<div className={s.container}>
				<div className={s.chatContainer}>
					chat
				</div>
				<div className={s.chatFormContainer}>
					<WeInput variant="chat" placeholder="Type your message..."/>
					<WeIconButton className={s.sendButton} icon={<Arrow/>}/>
				</div>
			</div>
		</TemplatePage>
	)
}
