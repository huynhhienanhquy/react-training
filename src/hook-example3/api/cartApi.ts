import type { Product } from "../types/product";

export async function addToCartApi(
  product: Product
): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return product;
}
