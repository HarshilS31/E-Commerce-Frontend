import api from "./cilent"
import type { userDetails,RegisterUserDetails } from "../types/interfaces"
import  type { ProductResponse } from "../types/interfaces"
export const getProducts  = async () :Promise<ProductResponse> => {
    const response = await api.get("/product/getAll")
    return response.data
}
export const getProductById = async (id:string) : Promise<ProductResponse> => {
     const response =await  api.get(`product/${id}`)
     return response.data  
} 
export const loginUser = async ( userData:userDetails ) => {
    const response = await api.post("/auth/login", userData)
    return response.data
}
export const registerUser = async (registrationData:RegisterUserDetails) => {
    const response = await api.post("/auth/register",registrationData)
    return response.data
}

