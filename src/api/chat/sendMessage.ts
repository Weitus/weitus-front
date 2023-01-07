import axios from "axios";
import {LOCAL_STORAGE_CONFIG} from "config/localStorageConfig";


export type SendMessageType = {
    Message: string
}

export const sendMessage = async (data: SendMessageType) => {
    return await axios.post(import.meta.env.VITE_API_URL + '/chat/message', data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN)}`
        }
    });
}
