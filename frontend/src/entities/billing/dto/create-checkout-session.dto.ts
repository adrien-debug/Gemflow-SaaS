export type CreateCheckoutSessionDto = {
  priceKey: string;
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
  quantity?: number;
};


