"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function HomePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const handleSetCategory = (category: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (category === "All") {
      current.delete("category");
    } else {
      current.set("category", category);
    }
    const search = current.toString();
    const queryString = search ? `?${search}` : "";
    router.push(`${pathname}${queryString}`);
  };

  const handleSetSearch = (query: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!query) {
      current.delete("q");
    } else {
      current.set("q", query);
    }
    const search = current.toString();
    const queryString = search ? `?${search}` : "";
    router.push(`${pathname}${queryString}`);
  };

  return (
    <>
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSetCategory}
        setSearchQuery={handleSetSearch}
      />
      {children}
    </>
  );
}