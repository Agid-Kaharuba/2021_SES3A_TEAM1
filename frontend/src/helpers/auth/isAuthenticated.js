import api from "../api/index";

export default async (authState, setAuthState) => {
    if (authState.authenticated) {
        try {
            const res = await api.auth.verify(authState.token);
            return true;
        }
        catch (err) {
            setAuthState({authenticated: false});
            return false;
        }
    } else {
        return false;
    }
};