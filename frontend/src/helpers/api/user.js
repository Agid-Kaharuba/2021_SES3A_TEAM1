import axios from "axios";
import { API_HOST } from ".";

export const getCurrentUser = async (token) => {
	const res = await axios.get(`${API_HOST}/user`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const getAllUser = async (token) => {
	const res = await axios.get(`${API_HOST}/user/all`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const getUser = async (token, userId) => {
	const res = await axios.get(`${API_HOST}/user/${userId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}