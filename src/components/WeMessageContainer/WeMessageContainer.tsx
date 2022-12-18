import React from 'react'
import s from "./WeMessageContainer.module.scss"
import {WeMessageContainerProps} from "./WeMessageContainer.types";
import clsx from "clsx";

export const WeMessageContainer: React.FC<WeMessageContainerProps> = (
	{
		message
	}) => {
	return (
		<div className={s["messageBox-" + (message.isFromBot ? "bot" : "user")]}>
			<div className={
				s["messageContainer-" + (message.isFromBot ? "bot" : "user")]
			}>
				<p> {message.text}
					{!!message.link &&
						<a
							className={s.link}
							href={message.link.href}
							target="_blank"
							rel="noreferrer"
						>
							{" "}{message.link.text}
						</a>}
				</p>
			</div>
			<div className={s.messageTime}>
				<p> {message.time} </p>
			</div>
		</div>
	)
}
