import api from "./cilent"
import type { userDetails,RegisterUserDetails } from "../types/interfaces"

export const loginUser = async ( userData:userDetails ) => {
    const response = await api.post("/auth/login", userData)
    return response.data
}
export const registerUser = async (registrationData:RegisterUserDetails) => {
    const response = await api.post("/auth/register",registrationData)
    return response.data
}
export const logoutUser = async () => {
    const res = await api.post("/auth/logout")
    return res.data
}
export const getCurrentUser  = async () => {
    const res = await api.get("/auth/me")
    return res.data
}
