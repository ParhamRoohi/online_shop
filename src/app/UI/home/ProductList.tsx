import React from "react";
import { getAllProducts } from "../../api/data";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const products: Product[] = await getAllProducts();

function ProductList() {
  return (
    <div className="grid grid-cols-3 h-fit w-full gap-2 mt-12">
      {products.map((item) => (
        <ProductCard {...item} key={item.id} />
      ))}
    </div>
  );
}

export default ProductList;
