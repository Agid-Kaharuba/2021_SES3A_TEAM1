import api from "../api/index";

export default async (authState) => {
    if (authState.authenticated) {
        try {
            const res = await api.auth.verify(authState.token);
            return true;
        }
        catch (err) {
            return false;
        }
    } else {
        return false;
    }
};