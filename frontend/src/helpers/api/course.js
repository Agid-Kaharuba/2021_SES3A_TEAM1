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

export const getCourse = async (token, courseId) => {
	const res = await axios.get(`${API_HOST}/course/${courseId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const createCourse = async (token, data) => {
	const res = await axios.post(`${API_HOST}/course`,
		data,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const updateCourse = async (token, courseId, data) => {
	const res = await axios.put(`${API_HOST}/course/${courseId}`,
		data,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const getCourseStats = async (token, courseId, userId) => {
	const res = await axios.get(`${API_HOST}/progress/statistics?courseId=${courseId}&userId=${userId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}

export const getAllCoursesWith = async (token, userId) => {
	const res = await axios.get(`${API_HOST}/course/user/${userId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res;
}
