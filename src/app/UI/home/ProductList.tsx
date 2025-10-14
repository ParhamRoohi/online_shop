"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../api/data";
import ProductCard from "./ProductCard";
import { useCategory } from "@/app/context/CategoryContext";

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

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const { selectedCategory, searchQuery } = useCategory();

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
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

  return (
    <div className="grid xl:grid-cols-3 grid-cols-1 h-fit w-full gap-2 xl:mt-12 mt-4">
      {filteredProducts.map((item) => (
        <ProductCard {...item} key={item.id} />
      ))}
    </div>
  );
}

export default ProductList;
