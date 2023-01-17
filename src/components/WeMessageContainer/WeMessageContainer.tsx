import React from 'react'
import s from "./WeMessageContainer.module.scss"
import {WeMessageContainerProps} from "./WeMessageContainer.types";
import ReactHtmlParser, {Transform} from 'react-html-parser';
import Linkify from 'react-linkify';

export const WeMessageContainer: React.FC<WeMessageContainerProps> = (
    {
        message
    }) => {

    const {text, time, isFromBot, link} = message;

    const transformHtmlToText: Transform = (node) => {
        if (node.type === 'tag' && node.name === 'br') {
            return <br/>
        }
    }

    return (
        <div className={s["messageBox-" + (isFromBot ? "bot" : "user")]}>
            <div className={
                s["messageContainer-" + (isFromBot ? "bot" : "user")]
            }>
				<span> {isFromBot ?
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a className={s.link} href={decoratedHref} key={key} target="_blank" rel="noopener noreferrer">
                            {decoratedText}
                        </a>
                    )}>
                        {ReactHtmlParser(text, {transform: transformHtmlToText})}
                    </Linkify>
                    // ReactHtmlParser(text, {transform: transformHtmlToText})
                    : text}
                    {!!link &&
                        <a
                            className={s.link}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {" "}{link.text}
                        </a>}
				</span>
            </div>
            <div className={s.messageTime}>
                <p> {time} </p>
            </div>
        </div>
    )
}
