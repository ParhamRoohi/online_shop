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

interface ProductListProps {
  selectedCategory: string;
  searchQuery: string;
}

async function ProductList({ selectedCategory, searchQuery }: ProductListProps) {
  const products: Product[] = await getAllProducts();

  const filteredByCategory =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const filteredProducts = filteredByCategory.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <p className="text-center col-span-full mt-12">
        No products found matching your criteria.
      </p>
    );
  }

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 h-fit w-full gap-2 xl:mt-12 mt-4">
      {filteredProducts.map((item) => (
        <ProductCard {...item} key={item.id} />
      ))}
    </div>
  );
}

export default ProductList;
