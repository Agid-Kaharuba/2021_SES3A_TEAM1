import axios from "axios";
import { API_HOST } from ".";

export const getAllTasks = async (token) => {
	const res = await axios.get(`${API_HOST}/task`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const createTask = async (token, data) => {
	const res = await axios.post(`${API_HOST}/task`,
		data,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const getTask = async (token, taskId) => {
	const res = await axios.get(`${API_HOST}/task/${taskId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const updateTask = async (token, taskId, data) => {
	const res = await axios.put(`${API_HOST}/task/${taskId}`,
		data,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}