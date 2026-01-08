import api from "@shared/api";
import type { CreateCheckoutSessionDto } from "../dto/create-checkout-session.dto";
import type { CheckoutSession } from "../models/checkout-session.model";

const BASE_URL = "/api/v1/billing";

export const BillingApi = {
  createCheckoutSession: async (dto: CreateCheckoutSessionDto): Promise<CheckoutSession> => {
    return api.post(`${BASE_URL}/checkout-session`, dto);
  },
};


