import axios from "axios";
import {LOCAL_STORAGE_CONFIG} from "config/localStorageConfig";

export const getMessages = async () => {
	return await axios.get(import.meta.env.VITE_API_URL + '/chat/messages', {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_CONFIG.AUTH_TOKEN)}`
		}
	}).then((r) => {
		return r.data
	})
}
