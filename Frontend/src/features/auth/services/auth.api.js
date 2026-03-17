import api from "../../../services/api";

export async function signup(data) {
    return await api.post("/auth/signup", data);
}

export async function login(data) {
    return await api.post("/auth/login", data);
}

export async function getMe() {
    return await api.get("/auth/profile");
}
