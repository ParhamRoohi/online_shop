"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import ProductList from "./ProductList";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
      />
      <ProductList
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
    </>
  );
}