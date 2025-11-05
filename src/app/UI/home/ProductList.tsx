"use client";
import React, { useEffect, useState, Suspense } from "react";
import { getAllProducts } from "../../api/data";
import ProductCard from "./ProductCard";
import { useCategory } from "@/app/context/CategoryContext";
import ProductSkeleton from "../components/ProductSkeleton";

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

  if (products.length === 0) {
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

function ProductListWrapper() {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductList />
    </Suspense>
  );
}

export default ProductListWrapper;