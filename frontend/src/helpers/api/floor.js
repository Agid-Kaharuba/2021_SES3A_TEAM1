import axios from "axios";
import { API_HOST } from ".";

export const getAllFloors = async (token) => {
	const res = await axios.get(`${API_HOST}/floor`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const createFloor = async (token, data) => {
	const res = await axios.post(`${API_HOST}/floor`,
		data,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const getFloor = async (token, floorId) => {
	const res = await axios.get(`${API_HOST}/floor/${floorId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const updateFloor = async (token, floorId, data) => {
	const res = await axios.put(`${API_HOST}/floor/${floorId}`,
		data,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const deleteFloor = async (token, userId, floorId) => {
	const res = await axios.delete(`${API_HOST}/floor/${floorId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}