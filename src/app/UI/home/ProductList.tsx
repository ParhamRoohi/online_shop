"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../api/data";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

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

function ProductList({ selectedCategory, searchQuery }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 h-fit w-full gap-2 xl:mt-12 mt-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
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
