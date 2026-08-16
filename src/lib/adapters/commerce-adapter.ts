export type CommerceUnavailable = {
  status: "NOT_CONFIGURED";
  message: string;
};
export type AddToCartInput = {
  productId: string;
  quantity: number;
};

export interface CommerceAdapter {
  getPrice(productId: string): Promise<CommerceUnavailable>;
  addToCart(input: AddToCartInput): Promise<CommerceUnavailable>;
}

export const localCommerceAdapter: CommerceAdapter = {
  async getPrice() {
    return {
      status: "NOT_CONFIGURED",
      message: "Price not configured",
    };
  },
  async addToCart() {
    return {
      status: "NOT_CONFIGURED",
      message: "Cart not configured",
    };
  },
};
