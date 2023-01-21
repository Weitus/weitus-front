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
import {WeTypingIndicator} from "../../components/WeTypingIndicator";
import * as trace_events from "trace_events";

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
    const [isTyping, setIsTyping] = useState(false)

    const lastElementRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        lastElementRef.current?.scrollIntoView()
    }

    const refetchMessages = () => {
        getMessagesRefetch()
    }

    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            setCurrentMessages(messages.map((message: any) => ({
                text: message.message,
                time: new Date(message.timeStamp).toLocaleTimeString('pl-PL', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                isFromBot: message.sentByBot
            })))
        }
    }, [messages])

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
        setIsTyping(true)
        setCurrentMessages([...currentMessages, newMessage])
        setTimeout(() => {
            scrollToBottom()
        }, 10)
        if (isLoggedIn) {
            sendMessage(data).then(() => {
                sendMessageToBot(sendData).then((response) => {
                    response.forEach((message: any) => {
                        const newBotMessage: SendMessageType = {
                            Message: message.text || message.image,
                        }
                        setIsTyping(true)
                        setTimeout(() => {
                            sendMessage(newBotMessage, true).then(() => {
                                refetchMessages()
                                setIsTyping(false)
                                setTimeout(() => {
                                    scrollToBottom()
                                }, 100)
                            })

                        }, 10)
                    })
                })
            })
        } else {
            sendMessageToBot(sendData).then((response) => {
                setCurrentMessages([...currentMessages, newMessage,
                    ...response.map((message: any) => ({
                        text: message.text || message.image,
                        time: new Date().toLocaleTimeString("pl-PL", {hour: "2-digit", minute: "2-digit"}),
                        isFromBot: true
                    }))
                ])
                setIsTyping(false)
            })
        }
        resetField("Message");
    }

    useEffect(() => {
        if (isLoggedIn) {
            refetchMessages()
            setTimeout(() => {
                scrollToBottom()
            }, 10)
        }
    }, [isLoggedIn])

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom()
        }, 10)
    }, [currentMessages])

    return (
        <TemplatePage>
            <div className={s.chatContainer}>
                {!isLoggedIn && currentMessages.map((message, index) => {
                    return <WeMessageContainer message={message} key={`message-mock-key-${index}`}/>
                })}
                {isLoggedIn && !isLoading && !error && currentMessages.map((message, index) => {
                    return <WeMessageContainer message={message} key={`message-key-${index}`}/>
                })}
                {isTyping && <WeTypingIndicator/>}
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
