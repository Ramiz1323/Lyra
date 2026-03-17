import { useDispatch, useSelector } from "react-redux";
import { signup, login, getMe } from "../services/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    async function handleSignup({ username, email, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            await signup({ username, email, password });
        } catch (err) {
            const message = typeof err === 'string' ? err : (err.message || "Signup failed");
            dispatch(setError(message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const response = await login({ email, password });
            dispatch(setUser(response.data.user));
            return response.data;
        } catch (err) {
            const message = typeof err === 'string' ? err : (err.message || "Login failed");
            dispatch(setError(message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const response = await getMe();
            dispatch(setUser(response.data.user));
        } catch (err) {
            const message = typeof err === 'string' ? err : (err.message || "Failed to fetch user");
            dispatch(setError(message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleSignup,
        handleLogin,
        handleGetMe,
        loading,
        error,
        user
    }
}