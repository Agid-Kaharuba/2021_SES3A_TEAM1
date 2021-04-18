import axios from "axios";
import { API_HOST } from ".";

export const registerUser = async (userData) => {
	const res = await axios.post(`${API_HOST}/auth/register`, userData);
	return res;
};

export const verifyLogin = async (userData) => {
	const res = await axios.post(`${API_HOST}/auth/login`, userData);
	return res;
}