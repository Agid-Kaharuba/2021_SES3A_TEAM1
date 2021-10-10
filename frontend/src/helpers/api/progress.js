import axios from "axios";
import { API_HOST } from ".";

export const getProgress = async (token, userId, taskId, courseId) => {
	const res = await axios.get(`${API_HOST}/progress?userId=${userId}&taskId=${taskId}&courseId=${courseId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}
