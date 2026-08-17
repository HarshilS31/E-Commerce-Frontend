import api from "./cilent"
import  type { ProductResponse } from "../types/interfaces"
export const getProducts  = async () :Promise<ProductResponse> => {
    const response = await api.get("/product/getAll")
    return response.data
}
export const getProductById = async (id:string) : Promise<ProductResponse> => {
     const response =await  api.get(`product/${id}`)
     return response.data  
} 

