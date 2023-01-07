import axios from "axios";

export type SendMessageToBotType = {
    sender: string,
    message: string
}

export type BotResponse = {
    recipient_id: string,
    text: string
}[]

export const sendMessageToBot = async (data: SendMessageToBotType): Promise<BotResponse> => {
    const response = await axios.post(import.meta.env.VITE_CHAT_URL + '/webhooks/rest/webhook', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}
