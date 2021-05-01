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