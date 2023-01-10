import React, {useEffect, useRef, useState} from 'react'
import {TemplatePage} from "templates/TemplatePage";
import {WeIconButton} from "components/WeIconButton";
import {ReactComponent as Arrow} from "assets/icons/arrow.svg";
import s from "./ChatPage.module.scss";
import {WeInput} from "components/WeInput";
import {getMessages} from "api/chat/getMessages";
import {useForm} from "react-hook-form";
import {sendMessage, SendMessageType} from "api/chat/sendMessage";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useUserContext} from "../../context/UserContext";
import {WeMessageContainer} from "../../components/WeMessageContainer";
import {sendMessageToBot} from "../../api/chat/sendMessageToBot";
import {LOCAL_STORAGE_CONFIG} from "../../config/localStorageConfig";

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

    const {isLoggedIn, username} = useUserContext()
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
        const newMessage = {
            text: data.Message,
            time: new Date().toLocaleTimeString("pl-PL", {hour: "2-digit", minute: "2-digit"}),
            isFromBot: false
        }
        const chatIdentifier = localStorage.getItem(LOCAL_STORAGE_CONFIG.CHAT_TOKEN)
        const sendData = {
            "message": data.Message,
            "sender": !!chatIdentifier ? chatIdentifier : "user"
        }
        if (isLoggedIn) {
            sendMessage(data).then(() => {
                sendMessageToBot(sendData).then((response) => {
                    response.forEach((message: any) => {
                        const newBotMessage: SendMessageType = {
                            Message: message.text || message.image,
                        }
                        sendMessage(newBotMessage, true).then((res) => {
                            getMessagesRefetch().then(() => {
                                setTimeout(() => {
                                    console.log("message test")
                                    scrollToBottom()
                                }, 10)
                            })
                        })
                    })
                })
            })
        } else {
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
            getMessagesRefetch().then(() => {
                    setTimeout(() => {
                        scrollToBottom()
                    }, 100)
                }
            );
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom()
        }, 100)
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
