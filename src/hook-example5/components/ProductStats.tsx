import { Badge, HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import type { Product } from "../types/product";

type ProductStatsProps = {
  products: Product[];
}

export function ProductStats({products}: ProductStatsProps) {
  // UseMemo will only be recalculated when products change
  const stats = useMemo(() => {
    const totalProduct = products.length;

    const totalStock= products.reduce((sum, product) => {
      return sum + product.stock;
    }, 0)

    const totalValue = products.reduce((sum, product) => {
      return sum + product.price * product.stock;
    }, 0)

    return {
      totalProduct,
      totalStock,
      totalValue,
    }
  }, [products])

  return (
    <HStack gap="3" wrap="wrap">

      <Badge colorPalette="blue">
        Product: {stats.totalProduct}
      </Badge>

      <Badge colorPalette="grenn">
        Stock: {stats.totalStock}
      </Badge>

      <Badge colorPalette="purple">
        Value: ${stats.totalValue}
      </Badge>

    </HStack>
  )
}
