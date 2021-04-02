import axios from "axios";
import { auth } from "../firebase";
import { API_HOST } from "../api/index";

export const loginUser = async (email, password) => {
	const user = (await auth().signInWithEmailAndPassword(email, password)).user;
	const token = await user.getIdTokenResult();
	
	return {
		user: {
			uid: user.uid,
			displayName: user.displayName,
			email: user.email,
			claims: token.claims,
			idToken: token.token,
		},
	};
};

export const verify = async(idToken) => {
	try {
		const res = await axios.get(
			`http://${API_HOST}/user/`,
			{
				headers: { Authorization: `Bearer ${idToken}` },
			}
		);
		return true;
	} catch (err) {
		return false;
	}
};
