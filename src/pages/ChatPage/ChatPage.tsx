import React, {useEffect, useRef, useState} from 'react'
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
import {sendMessageToBot} from "../../api/chat/sendMessageToBot";

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
    const [currentMessages, setCurrentMessages] = useState<{
        text: string,
        time: string,
        isFromBot: boolean,
    }[]>([])

    const lastElementRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        lastElementRef.current?.scrollIntoView()
    }

    const onSubmit = (data: any) => {
        if (isLoggedIn) {
            sendMessage(data).then(() => {
                getMessagesRefetch()
            })
        } else {
            const newMessage = {
                text: data.Message,
                time: new Date().toLocaleTimeString("pl-PL", {hour: "2-digit", minute: "2-digit"}),
                isFromBot: false
            }
            const sendData = {
                "message": data.Message,
                "sender": "user"
            }
            sendMessageToBot(sendData).then((response) => {
                setCurrentMessages([...currentMessages, newMessage,
                    ...response.map((message: any) => ({
                        text: message.text,
                        time: new Date().toLocaleTimeString("pl-PL", {hour: "2-digit", minute: "2-digit"}),
                        isFromBot: true
                    }))
                ])
            })
        }
        resetField("Message");
    }

    useEffect(() => {
        if (isLoggedIn) {
            getMessagesRefetch();
        }
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [currentMessages])

    return (
        <TemplatePage>
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
                <div ref={lastElementRef}/>
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
        </TemplatePage>
    )
}
