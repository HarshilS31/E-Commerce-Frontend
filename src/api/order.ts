import api from "./cilent"
import type { OrderItemInput, OrderResponse } from "../types/interfaces"

export const createOrder = async (items: OrderItemInput[]): Promise<OrderResponse> => {
    const response = await api.post("/order/create", { items })
    return response.data
}

export const updatePaymentStatus = async (
    orderId: string,
    paymentStatus: "simulated" | "pending"
): Promise<OrderResponse> => {
    const response = await api.put(`/order/payment/${orderId}`, { paymentStatus })
    return response.data
}