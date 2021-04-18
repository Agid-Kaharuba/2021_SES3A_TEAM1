import axios from "axios";
import { API_HOST } from ".";

export const getAllCourses = async (token) => {
	const res = await axios.get(`${API_HOST}/course`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}