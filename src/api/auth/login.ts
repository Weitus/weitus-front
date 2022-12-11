import axios from "axios";

export type loginData = {
	UserName: string;
	Password: string;
}

export const login = async (data: loginData) => {
	return await axios.post(import.meta.env.VITE_API_URL + '/auth/login', data)
}
