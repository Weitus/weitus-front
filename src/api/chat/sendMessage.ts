import axios from "axios";
import {LOCAL_STORAGE_CONFIG} from "config/localStorageConfig";


export type SendMessageType = {
  Message: string
  BotId?: number
}

export const sendMessage = async (data: SendMessageType, isFromBot: boolean = false) => {
  data.BotId = 1
  return await axios.post(
    import.meta.env.VITE_API_URL + `/chat/${isFromBot ? "botMessage" : "message"}`,
    data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN)}`
      }
    });
}
