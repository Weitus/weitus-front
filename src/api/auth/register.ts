import axios from "axios";

export type RegisterData = {
	UserName: string;
	Password: string;
	Email: string;
}

export const login = async (data: RegisterData) => {
	return await axios.post(import.meta.env.VITE_API_URL + '/auth/register', data)
}
