import axios from "axios";

export type LoginData = {
	UserName: string;
	Password: string;
}

export const login = async (data: LoginData) => {
	return await axios.post(import.meta.env.VITE_API_URL + '/auth/login', data)
}
