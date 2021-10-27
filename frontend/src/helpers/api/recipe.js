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

export const createRecipe = async (token, data) => {
	const res = await axios.post(`${API_HOST}/recipe`,
		data,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const updateRecipe = async (token, recipeId, data) => {
	const res = await axios.put(`${API_HOST}/recipe/${recipeId}`,
		data,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const getRecipe = async (token, recipeId) => {
	const res = await axios.get(`${API_HOST}/recipe/${recipeId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const deleteRecipe = async (token, recipeId) => {
	const res = await axios.delete(`${API_HOST}/recipe/${recipeId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}
