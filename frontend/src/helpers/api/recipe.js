import axios from "axios";
import { API_HOST } from ".";

export const getAllRecipes = async (token) => {
	const res = await axios.get(`${API_HOST}/recipe`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}
